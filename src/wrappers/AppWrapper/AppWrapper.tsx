import AppBottom from '@/components/AppBottom/AppBottom';
import React from 'react';
import classes from './AppWrapper.module.css';
import Image from 'next/image';
import { navbarIcons } from '@/assets';
import { useRouter } from 'next/router';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className={classes.app_wrapper}>
      <div className={classes.topNav}>
        <p>{router.pathname.includes('list') ? 'My Lists' : 'GMTX'}</p>
        <Image src={navbarIcons.burgerIcon} alt="burger" />
      </div>
      {children}
      <AppBottom />
    </div>
  );
};

export default AppWrapper;
