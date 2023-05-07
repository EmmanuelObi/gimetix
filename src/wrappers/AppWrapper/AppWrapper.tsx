import AppBottom from '@/components/AppBottom/AppBottom';
import React from 'react';
import classes from './AppWrapper.module.css';
import Image from 'next/image';
import { navbarIcons } from '@/assets';
import { useRouter } from 'next/router';
import {
  Box,
  chakra,
  HStack,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SideDrawer from '@/components/SideDrawer/SideDrawer';
import { auth } from '@/config/firebase';
import AppSide from '@/components/AppSide/AppSide';
import { useSelector } from 'react-redux';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    app: { currentStream },
  }: any = useSelector((state) => state);

  const handleBarText = () => {
    if (router.pathname.includes('list')) {
      return 'My List';
    }
    if (router.pathname.includes('live')) {
      if (currentStream !== '') {
        return currentStream;
      }
      return 'Live Events';
    }

    let today = new Date();
    let curHr = today.getHours();
    let time = null;

    if (curHr < 12) {
      time = 'Morning';
    } else if (curHr < 17) {
      time = 'Afternoon';
    } else {
      time = 'Evening';
    }
    return `Good ${time}`;
  };

  return (
    <>
      {!isMobile ? (
        <Box
          className={classes.largeWrap}
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          position="relative"
        >
          <AppSide />
          <VStack
            spacing="2"
            w="100vw"
            pt="5"
            minH="100vh"
            ml="130px"
            color="#fff"
          >
            <Text
              w="70%"
              color="#fff"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              fontSize="2xl"
              fontWeight="600"
              minH="90px"
              bg="radial-gradient(50% 50% at 50% 50%, #0FEC3F 0%, rgba(11, 169, 46, 0) 100%);"
            >
              Stream your favorite events on&nbsp;
              <chakra.span fontWeight="800">GMTX</chakra.span>
            </Text>
            <Box
              w="full"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px="20"
              minH="100px"
            >
              <Text
                color="#fff"
                fontSize={{ base: 'sm', lg: '2xl' }}
                w="80%"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {handleBarText()}
              </Text>
              <Image
                src={navbarIcons.burgerIcon}
                alt="burger"
                onClick={onOpen}
              />
            </Box>
            {children}
          </VStack>
        </Box>
      ) : (
        <div className={classes.app_wrapper}>
          <div className={classes.topNav}>
            <p> {handleBarText()}</p>
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
      )}

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AppWrapper;
