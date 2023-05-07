import { concertAssets, homeAssets } from '@/assets';
import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import {
  VStack,
  Text,
  HStack,
  Box,
  chakra,
  Skeleton,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from '@/styles/app/list.module.css';
import { ListData } from '@/data';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import ListCard from '@/components/ListCard/ListCard';

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [streamsData, setStreamData] = useState<any>([]);
  const [liveStreamsData, setLiveStreamData] = useState<any>([]);
  const [upcomingStreamsData, setUpcomingStreamData] = useState<any>([]);
  const streamsRef = collection(db, 'streams');
  const getStreams = async () => {
    let liveData: any;
    let upcomingData: any;
    try {
      setPageLoading(true);
      const data = await getDocs(streamsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      liveData = filteredData.filter(
        (item: any) =>
          new Date((item.dateTime.seconds - 1800) * 1000).getSeconds() <
          Math.floor(Date.now() / 1000)
      );

      liveData.sort(
        (a: any, b: any) => a.dateTime.seconds - b.dateTime.seconds
      );
      upcomingData = filteredData.filter(
        (item: any) =>
          new Date((item.dateTime.seconds - 1800) * 1000).getSeconds() >=
          Math.floor(Date.now() / 1000)
      );
      upcomingData.sort(
        (a: any, b: any) => a.dateTime.seconds - b.dateTime.seconds
      );
      setStreamData(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }

    try {
      console.log({ upcomingData, liveData });
      setLiveStreamData(() => liveData);
      setUpcomingStreamData(() => upcomingData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStreams();
  }, []);

  if (pageLoading) return <Spinner color="#fff" size="lg" />;
  if (liveStreamsData?.length === 0 && upcomingStreamsData?.length === 0)
    return <Text color="#fff">No streams at this time</Text>;

  return (
    <Box width="full" my="10" overflowY="scroll" pl={isMobile ? '0' : '20'}>
      {liveStreamsData.length > 0 ? (
        <>
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
            {liveStreamsData.length > 0
              ? liveStreamsData.map((item: any, id: number) => (
                  <ListCard key={id} id={id} isLive={false} item={item} />
                ))
              : null}
          </HStack>{' '}
        </>
      ) : null}
      {upcomingStreamsData?.length > 0 ? (
        <>
          {' '}
          <Text
            my="4"
            w="full"
            color="#fff"
            fontWeight="bold"
            fontFamily="Work Sans"
          >
            Upcoming
          </Text>
          <HStack overflowX="scroll" w="full">
            {upcomingStreamsData.length > 0
              ? upcomingStreamsData.map((item: any, id: number) => (
                  <ListCard key={id} id={id} isLive={false} item={item} />
                ))
              : null}
          </HStack>
        </>
      ) : null}

      {/* {liveStreamsData?.length > 0 ? (
        <>
          {' '}
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
            {liveStreamsData?.map((item: any) => (
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
        </>
      ) : null} */}

      {/* {upcomingStreamsData?.length > 0 ? (
        <>
          {' '}
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
            {upcomingStreamsData?.map((item: any) => (
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
                    textTransform="capitalize"
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
        </>
      ) : null} */}
    </Box>
  );
};

Home.PageLayout = AppWrapper;
export default Home;
