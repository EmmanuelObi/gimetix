import { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Modal,
  Button,
  TextInput,
  Group,
  Select,
  LoadingOverlay,
  Tooltip,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '@/config/firebase';
import {
  IconTrash,
  IconHourglassEmpty,
  IconPencil,
  IconPlus,
  IconUpload,
  IconPhoto,
  IconX,
} from '@tabler/icons-react';
import {
  VStack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { getDoc, doc, collection, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import useStreams from '@/hooks/useStreams';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
  link: {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; email: string; isSubscriber: boolean; id: string }[];
}

export function StreamsTable({ data, deleteStream }: any) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [editId, setEditId] = useState('');

  const rows = data?.map((row: any) => (
    <tr key={row.id}>
      <td>{row.title}</td>
      <td>
        <a target="_blank" className={cx(classes.link)} href={row.streamLink}>
          Open Stream
        </a>
      </td>
      <td>{row.genre}</td>
      <td>
        <a target="_blank" className={cx(classes.link)} href={row.imageUrl}>
          Open Image
        </a>
      </td>
      <td>{row.id}</td>
      <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Tooltip label="Delete">
          <IconTrash
            size="1rem"
            cursor="pointer"
            onClick={() => deleteStream(row.id)}
          />
        </Tooltip>
        <Tooltip label="Edit">
          <IconPencil
            size="1rem"
            cursor="pointer"
            onClick={() => {
              onOpen();
              setEditId(() => row.id);
            }}
          />
        </Tooltip>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      h="70vh"
      w="70vw"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      {rows.length > 0 ? (
        <Table>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Title</th>
              <th>StreamLink</th>
              <th>Genre</th>
              <th>ImageUrl</th>
              <th>ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          <UpdateModal isOpen={isOpen} onClose={onClose} id={editId} />
        </Table>
      ) : (
        <VStack w="full">
          <IconHourglassEmpty />
          <Text>No records to display</Text>
        </VStack>
      )}
    </ScrollArea>
  );
}

const UpdateModal = ({ isOpen, onClose, id }: any) => {
  const [imgLoading, setImgLoading] = useState(false);
  const { updateStream, formLoading } = useStreams();
  const form = useForm({
    initialValues: {
      title: '',
      streamLink: '',
      imageUrl: '',
      genre: '',
      dateTime: '',
    },
  });
  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="xs">
      <DrawerContent h="100vh" pt="30px">
        <DrawerCloseButton onClick={() => form.reset()} />
        <DrawerBody>
          <Text fontSize="sm" textAlign="center" my="3" color="red">
            Only fields edited here will change in database!
          </Text>
          <form
            onSubmit={form.onSubmit((data, e) =>
              updateStream(data, e, id, form, onClose)
            )}
          >
            <TextInput
              label="Title"
              placeholder="New York Knicks VS Miami Heat"
              value={form.values.title}
              onChange={(event) =>
                form.setFieldValue('title', event.currentTarget.value)
              }
              error={form.errors.title && 'Invalid title'}
              radius="md"
            />

            <TextInput
              label="Stream Link"
              placeholder="https://********/******"
              value={form.values.streamLink}
              onChange={(event) =>
                form.setFieldValue('streamLink', event.currentTarget.value)
              }
              error={form.errors.streamLink && 'Invalid Link'}
              radius="md"
            />
            <Text fontSize="sm" mt="2">
              Thumbnail
            </Text>
            <Dropzone
              loading={imgLoading}
              onDrop={(files) => {
                setImgLoading(true);
                const imageRef = ref(storage, `images/${files[0].name + v4()}`);
                uploadBytes(imageRef, files[0]).then((item) => {
                  getDownloadURL(item.ref).then((url) =>
                    form.setFieldValue('imageUrl', url)
                  );
                  notifications.show({
                    id: 'upload',
                    color: 'indigo',
                    title: 'Success',
                    message: 'Image Uploaded',
                    autoClose: 3000,
                    withCloseButton: false,
                  });
                  setImgLoading(false);
                });
              }}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(120), pointerEvents: 'none' }}
              >
                <Dropzone.Accept>
                  <IconUpload size="3.2rem" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size="3.2rem" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text fontSize="md">
                    {form.values.imageUrl
                      ? 'Uploaded'
                      : ' Drag images here or click to select file'}
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Select
              label="Genre"
              placeholder="Select one"
              value={form.values.genre}
              onChange={(value: any) => form.setFieldValue('genre', value)}
              data={[
                { value: 'football', label: 'football' },
                { value: 'basketball', label: 'basketball' },
              ]}
            />
            <DateTimePicker
              label="Date and Time"
              placeholder="Pick date and time"
              maw={400}
              mx="auto"
              onChange={(event: any) => form.setFieldValue('dateTime', event)}
            />
            <br />

            <Button
              leftIcon={<IconPencil size="1rem" />}
              w="100%"
              type="submit"
              loaderPosition="left"
              loading={formLoading}
            >
              Make change
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
