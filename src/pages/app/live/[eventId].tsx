import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import { Text, VStack, chakra, Box } from '@chakra-ui/react';
import React from 'react';
import classes from '@/styles/app/list.module.css';

const EventStream = () => {
  return (
    <div className={classes.list_container}>
      <br />
      <iframe
        width="100%"
        height="400px"
        src="https://www.youtube.com/embed/vU5wa1mIMfw?autoplay=1&mute=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <VStack w={{ base: '90%', md: '70%' }} mx="auto" mt="8">
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="#fff" fontWeight="bold" fontFamily="Work Sans">
            All Streams
          </Text>
          <chakra.span
            w={{ base: 'calc(100% - 100px)', md: 'calc(100% - 200px)' }}
            h="0.5"
            bg="#fff"
          >
            1
          </chakra.span>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          w="full"
        >
          <Text
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="3"
            px="3"
            fontWeight="bold"
            fontFamily="Work Sans"
            fontSize="md"
            minW={{ base: 'full', md: '300px' }}
            color="#fff"
            bg="#1E1B1B"
            _hover={{ bg: '#1e1b1b' }}
            borderRadius="10px"
            position="relative"
            my="1"
          >
            HipTv{' '}
            <chakra.span
              color="#fff"
              bg="#0060FF"
              fontFamily="Work Sans"
              fontWeight="bold"
              rounded="md"
              px="2"
              py="1"
              cursor="pointer"
            >
              Watch
            </chakra.span>
          </Text>
          <Text
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="3"
            px="3"
            fontWeight="bold"
            fontFamily="Work Sans"
            fontSize="md"
            minW={{ base: 'full', md: '300px' }}
            color="#fff"
            bg="#1E1B1B"
            _hover={{ bg: '#1e1b1b' }}
            borderRadius="10px"
            position="relative"
            my="1"
          >
            Sound City{' '}
            <chakra.span
              color="#fff"
              bg="#0060FF"
              fontFamily="Work Sans"
              fontWeight="bold"
              rounded="md"
              px="2"
              py="1"
              cursor="pointer"
            >
              Watch
            </chakra.span>
          </Text>
          <Text
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="3"
            px="3"
            fontWeight="bold"
            fontFamily="Work Sans"
            fontSize="md"
            minW={{ base: 'full', md: '300px' }}
            color="#fff"
            bg="#1E1B1B"
            _hover={{ bg: '#1e1b1b' }}
            borderRadius="10px"
            position="relative"
            my="1"
          >
            POP Central{' '}
            <chakra.span
              color="#fff"
              bg="#0060FF"
              fontFamily="Work Sans"
              fontWeight="bold"
              rounded="md"
              px="2"
              py="1"
              cursor="pointer"
            >
              Watch
            </chakra.span>
          </Text>
        </Box>
      </VStack>
    </div>
  );
};

EventStream.PageLayout = AppWrapper;

export default EventStream;
