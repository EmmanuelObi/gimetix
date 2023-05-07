import { Text, Tooltip, VStack } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { navbarIcons } from '@/assets';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from '@/components/AppBottom/AppBottom.module.css';

const AppSide = () => {
  const router = useRouter();
  return (
    <VStack
      w="130px"
      bg="#1B1B1B"
      color="#fff"
      height="100vh"
      spacing="16"
      pt="20"
      position="fixed"
    >
      <Image src={navbarIcons.logo} alt="logo" width="80" height="80" />

      <VStack
        w="full"
        minH="50%"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <Tooltip label="Home">
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
        </Tooltip>
        <Tooltip label="Live">
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
          </Link>
        </Tooltip>
        <Tooltip label="My List">
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
          </Link>
        </Tooltip>
      </VStack>
    </VStack>
  );
};

export default AppSide;
