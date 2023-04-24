import { concertAssets, homeAssets } from '@/assets';
import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import { VStack, Text, HStack, Box, chakra } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import classes from '@/styles/app/list.module.css';

const Home = () => {
  const { home1, home2, home3, home4 } = homeAssets;
  const data = [home1, home2, home3, home4, home1, home2, home3, home4];
  return (
    <Box width="full" my="10" overflowY="scroll" h="calc(100vh - 160px)">
      <Text
        my="4"
        w="full"
        color="#fff"
        fontWeight="bold"
        fontFamily="Work Sans"
      >
        Now Streaming
      </Text>

      <HStack overflowX="scroll" w="full">
        {data.map((item, id) => (
          <VStack
            key={id}
            position="relative"
            minW={{ base: '90%', md: '300px' }}
            minH="500px"
            bg={{ base: 'black', red: 'red' }}
            mx="2"
          >
            <Image src={item} alt="wizzy" className={classes.mainImg} />
            <Box
              w="full"
              position="absolute"
              bottom="0"
              bg="#1e1b1b"
              minH="50px"
              px="2"
              py="1"
            >
              <Text
                fontSize="lg"
                color="#ffffff"
                fontWeight="bold"
                fontFamily="Roboto"
              >
                Adam Levine
              </Text>
              <Text
                fontSize="md"
                color="rgba(255, 255, 255, 0.6)"
                fontFamily="Roboto"
              >
                Streaming
              </Text>
            </Box>
          </VStack>
        ))}
      </HStack>

      <Box
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          w="full"
          my="4"
          color="#fff"
          fontWeight="bold"
          fontFamily="Work Sans"
        >
          Upcoming
        </Text>
        <chakra.span
          w={{ base: 'full', md: 'calc(100% - 200px)' }}
          h="0.2"
          bg="#fff"
        ></chakra.span>
      </Box>

      <HStack overflowX="scroll" w="full">
        {data.reverse().map((item, id) => (
          <VStack
            key={id}
            position="relative"
            minW={{ base: '90%', md: '300px' }}
            minH="500px"
            mx="2"
            bg={{ base: 'black', red: 'red' }}
          >
            <Image src={item} alt="wizzy" className={classes.mainImg} />
            <Box
              w="full"
              position="absolute"
              bottom="0"
              bg="#1e1b1b"
              minH="50px"
              px="2"
              py="1"
            >
              <Text
                fontSize="lg"
                color="#ffffff"
                fontWeight="bold"
                fontFamily="Roboto"
              >
                BasketMouth
              </Text>
              <Text
                fontSize="md"
                color="rgba(255, 255, 255, 0.6)"
                fontFamily="Roboto"
              >
                Upcoming
              </Text>
            </Box>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

Home.PageLayout = AppWrapper;
export default Home;
