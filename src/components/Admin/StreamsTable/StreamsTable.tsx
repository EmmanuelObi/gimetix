import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { IconTrash, IconHourglassEmpty } from '@tabler/icons-react';
import { VStack, Text } from '@chakra-ui/react';

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
      <td>
        <IconTrash cursor="pointer" onClick={() => deleteStream(row.id)} />
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
