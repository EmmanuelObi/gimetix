import { navbarIcons } from '@/assets';
import useAuth from '@/hooks/useAuth';
import {
  chakra,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

function SideDrawer({ isOpen, onClose }: any) {
  const { logOut } = useAuth();

  return (
    <>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent h="100vh" bg="black" pt="30px">
          <DrawerBody>
            <Text
              display="flex"
              alignItems="center"
              color="#fff"
              fontWeight="bold"
              fontSize="xl"
              fontFamily="Roboto"
            >
              <Image
                src={navbarIcons.behindIcon}
                alt="behind"
                onClick={onClose}
                style={{ cursor: 'pointer' }}
              />
              &nbsp; &nbsp; &nbsp; My Profile
            </Text>

            <VStack width="100%" h="100vh" zIndex="100000" mt="30px">
              <Text
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                py="3"
                px="3"
                fontWeight="bold"
                fontFamily="Work Sans"
                fontSize="md"
                w="100%"
                color="#fff"
                bg="#1E1B1B"
                _hover={{ bg: '#1e1b1b' }}
                borderRadius="10px"
                position="relative"
                cursor="pointer"
              >
                <Image src={navbarIcons.notifyIcon} alt="notify" /> &nbsp;
                &nbsp; Notifications{' '}
                <chakra.span position="absolute" right="3">
                  {' '}
                  <Image src={navbarIcons.rightCaretIcon} alt="notify" />
                </chakra.span>
              </Text>
              <Text
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                py="3"
                px="3"
                fontWeight="bold"
                fontFamily="Work Sans"
                fontSize="md"
                w="100%"
                color="#fff"
                bg="#1E1B1B"
                _hover={{ bg: '#1e1b1b' }}
                borderRadius="10px"
                position="relative"
                cursor="pointer"
              >
                <Image src={navbarIcons.billingIcon} alt="billing" /> &nbsp;
                &nbsp; Billing{' '}
                <chakra.span position="absolute" right="3">
                  {' '}
                  <Image src={navbarIcons.rightCaretIcon} alt="notify" />
                </chakra.span>
              </Text>
              <Text
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                py="3"
                px="3"
                fontWeight="bold"
                fontFamily="Work Sans"
                fontSize="md"
                w="100%"
                color="#fff"
                bg="#1E1B1B"
                _hover={{ bg: '#1e1b1b' }}
                borderRadius="10px"
                position="relative"
                cursor="pointer"
              >
                <Image src={navbarIcons.settingsIcon} alt="settings" /> &nbsp;
                &nbsp; Settings{' '}
                <chakra.span position="absolute" right="3">
                  {' '}
                  <Image src={navbarIcons.rightCaretIcon} alt="notify" />
                </chakra.span>
              </Text>
              <Text
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                py="3"
                px="3"
                fontWeight="bold"
                fontFamily="Work Sans"
                fontSize="md"
                w="100%"
                color="#fff"
                bg="#1E1B1B"
                _hover={{ bg: '#1e1b1b' }}
                borderRadius="10px"
                position="relative"
                cursor="pointer"
                onClick={logOut}
              >
                <Image src={navbarIcons.logOutIcon} alt="log out" /> &nbsp;
                &nbsp; Sign Out{' '}
                <chakra.span position="absolute" right="3">
                  {' '}
                  <Image src={navbarIcons.rightCaretIcon} alt="notify" />
                </chakra.span>
              </Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
