import React from 'react';
import { Flex } from '@mantine/core';
import classes from '@/components/AppBottom/AppBottom.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { navbarIcons } from '@/assets';
import { useRouter } from 'next/router';
import { Box, VStack } from '@chakra-ui/react';

const AppBottom = () => {
  const router = useRouter();
  return (
    <Flex
      px="xs"
      gap="xs"
      justify="space-evenly"
      align="center"
      direction="row"
      wrap="wrap"
      className={classes.appNav}
    >
      <Link href="/app">
        <Image
          src={
            router.pathname === '/app'
              ? navbarIcons.homeWhite
              : navbarIcons.homeDark
          }
          alt="home"
          width="30"
          className={classes.links}
        />
      </Link>
      <Link href="/app/live">
        <Image
          src={
            router.pathname.includes('/app/live')
              ? navbarIcons.liveWhite
              : navbarIcons.liveDark
          }
          alt="live"
          width="22"
          className={classes.links}
        />
      </Link>{' '}
      <Link href="/app/live">
        <Image
          src={
            router.pathname.includes('/app/list')
              ? navbarIcons.listWhite
              : navbarIcons.listDark
          }
          alt="list"
          width="22"
          className={classes.links}
        />
      </Link>{' '}
    </Flex>
  );
};

export default AppBottom;
