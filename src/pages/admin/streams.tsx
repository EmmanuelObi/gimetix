import { StreamsTable } from '@/components/Admin/StreamsTable/StreamsTable';
import { db } from '@/config/firebase';
import { storage } from '@/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { VStack, Text } from '@chakra-ui/react';
import { DateTimePicker } from '@mantine/dates';
import React, { useEffect, useState } from 'react';
import Admin from './container';
import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  TextInput,
  useMantineTheme,
  rem,
  Group,
  Select,
  LoadingOverlay,
} from '@mantine/core';
import { IconPlus, IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import useStreams from '@/hooks/useStreams';

const Streams = () => {
  const { streamsData, getStreams, formLoading, addStream, deleteStream } =
    useStreams();
  const [imgLoading, setImgLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: '',
      streamLink: '',
      imageUrl: '',
      genre: '',
      dateTime: '',
    },

    validate: {
      title: (val) =>
        val.length <= 6 ? 'Title should include at least 6 characters' : null,
      streamLink: (val) =>
        val.length <= 6 ? 'Link should include at least 6 characters' : null,
      imageUrl: (val) => (val.length <= 6 ? 'Image is invalid' : null),
      genre: (val) => (val.length <= 2 ? 'Genre is invalid' : null),
      dateTime: (val) => (val.length <= 1 ? 'DateTime is invalid ' : null),
    },
  });

  useEffect(() => {
    getStreams();
  }, []);
  return (
    <VStack align="start" w="full" minH="100vh" bg="#fff" spacing="10" p="10">
      {streamsData ? (
        <>
          <Text color="black" fontWeight="bold" fontSize="lg">
            Streams List ({streamsData?.length})
          </Text>

          <Button leftIcon={<IconPlus size="1rem" />} onClick={open}>
            Add Stream
          </Button>

          <StreamsTable data={streamsData} deleteStream={deleteStream} />

          <Modal opened={opened} onClose={close} title="Add Stream">
            <LoadingOverlay visible={formLoading} overlayBlur={2} />
            <form
              onSubmit={form.onSubmit((data, e) =>
                addStream(data, e, form, close)
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
                placeholder="New York Knicks VS Miami Heat"
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
                  const imageRef = ref(
                    storage,
                    `images/${files[0].name + v4()}`
                  );
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
                leftIcon={<IconPlus size="1rem" />}
                w="100%"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Modal>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </VStack>
  );
};

Streams.PageLayout = Admin;

export default Streams;
