import AppBottom from '@/components/AppBottom/AppBottom';
import React from 'react';
import classes from './AppWrapper.module.css';
import Image from 'next/image';
import { navbarIcons } from '@/assets';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import SideDrawer from '@/components/SideDrawer/SideDrawer';
import { auth } from '@/config/firebase';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <div className={classes.app_wrapper}>
        <div className={classes.topNav}>
          <p>
            {router.pathname.includes('list')
              ? 'My Lists'
              : auth?.currentUser?.displayName
              ? `Dear ${auth?.currentUser?.displayName},`
              : 'GMTX'}
          </p>
          <Image src={navbarIcons.burgerIcon} alt="burger" onClick={onOpen} />
        </div>
        {children}
        <AppBottom />
      </div>
      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AppWrapper;
