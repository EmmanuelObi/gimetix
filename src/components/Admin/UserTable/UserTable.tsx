import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';

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

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; email: string; isSubscriber: boolean; id: string }[];
}

export function UserTable({ data }: any) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data?.map((row: any) => (
    <tr key={row.id}>
      <td>{row.username}</td>
      <td>{row.email}</td>
      <td>{row.isSubscriber ? 'True' : 'False'}</td>
      <td>{row.id}</td>
    </tr>
  ));

  return (
    <ScrollArea
      h="70vh"
      w="70vw"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>IsSubscriber</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
