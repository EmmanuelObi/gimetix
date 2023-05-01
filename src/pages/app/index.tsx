import { concertAssets, homeAssets } from '@/assets';
import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import { VStack, Text, HStack, Box, chakra } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from '@/styles/app/list.module.css';
import { homeData, ListData, upcomingListData } from '@/data';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

const Home = () => {
  const router = useRouter();
  const [streamsData, setStreamData] = useState<any>();
  const streamsRef = collection(db, 'streams');
  const getStreams = async () => {
    try {
      const data = await getDocs(streamsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStreamData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStreams();
  }, []);

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
        {streamsData?.map((item: any) => (
          <VStack
            key={item.id}
            position="relative"
            minW={{ base: '90%', md: '300px' }}
            minH="500px"
            bg={{ base: 'black', red: 'red' }}
            mx="2"
            onClick={() => router.push('/app/live')}
            cursor="pointer"
          >
            <Image
              src={item.imageUrl}
              alt="wizzy"
              className={classes.mainImg}
              width="300"
              height="500"
            />
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
                textTransform="capitalize"
              >
                {item.title}
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
        {streamsData?.map((item: any) => (
          <VStack
            key={item.id}
            position="relative"
            minW={{ base: '90%', md: '300px' }}
            minH="500px"
            mx="2"
            bg={{ base: 'black', red: 'red' }}
          >
            <Image
              src={item.imageUrl}
              alt="wizzy"
              width="300"
              height="500"
              className={classes.mainImg}
            />
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
                {item.title}
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
