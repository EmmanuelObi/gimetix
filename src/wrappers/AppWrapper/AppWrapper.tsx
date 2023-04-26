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
  // const [displayName, setDisplayName] = useState<any>('');

  // useEffect(() => {
  //   setTimeout(() => setDisplayName(auth?.currentUser?.displayName), 5000);
  // }, []);

  return (
    <>
      <div className={classes.app_wrapper}>
        <div className={classes.topNav}>
          <p>
            {router.pathname.includes('list')
              ? 'My Lists'
              : // : displayName
                // ? `Dear ${displayName},`
                'GMTX'}
          </p>
          <Image src={navbarIcons.burgerIcon} alt="burger" onClick={onOpen} />
        </div>
        {children}
        <div
          style={{
            width: '100%',
            background: 'black',
            minHeight: '70px',
            position: 'fixed',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            margin: 0,
          }}
        >
          <AppBottom />
        </div>
      </div>
      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AppWrapper;
