import { Flex } from '@mantine/core';
import React from 'react';
import classes from '@/components/BottomNav/bottomNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { navbarIcons } from '@/assets';

const BottomNav = () => {
  return (
    <Flex
      px="xs"
      mih={80}
      gap="xs"
      justify="space-around"
      align="center"
      direction="row"
      wrap="wrap"
      className={classes.bottomNav}
    >
      <Link href="/live">
        <Image
          src={navbarIcons.playIcon}
          alt="live"
          width="17"
          className={classes.links}
        />
        <p>Live</p>
      </Link>
      <Link href="/resell">
        <Image
          src={navbarIcons.cashIcon}
          alt="resell"
          width="17"
          className={classes.links}
        />
        <p>Resell</p>
      </Link>{' '}
      <Link href="/home/discover">
        <Image src={navbarIcons.homeIcon} alt="home" width="40" height="40" />
      </Link>{' '}
      <Link href="/wallet">
        <Image
          src={navbarIcons.walletIcon}
          alt="wallet"
          width="17"
          className={classes.links}
        />
        <p>Wallet</p>
      </Link>{' '}
      <Link href="/tickets">
        <Image
          src={navbarIcons.ticketIcon}
          alt="ticket"
          width="17"
          className={classes.links}
        />
        <p>Ticket</p>
      </Link>
    </Flex>
  );
};

export default BottomNav;
