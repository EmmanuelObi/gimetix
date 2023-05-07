import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import { Text, VStack, chakra, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import classes from '@/styles/app/list.module.css';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useSelector } from 'react-redux';

const links: any = {
  a: 'https://weaksports.xyz/footy/ch13.php',
  b: 'https://weaksports.xyz/footy/ch5.php',
  c: 'https://weaksports.xyz/footy/ch12.php',
  d: 'https://weakstream.org/streams/badifgef',
  e: 'https://weaksports.xyz/footy/ch9.php',
};

const EventStream = () => {
  const {
    app: { currentStream },
  }: any = useSelector((state) => state);
  const router: any = useRouter();
  const [streamsData, setStreamData] = useState<any>();
  const [otherStreamsData, setOtherStreamData] = useState<any>();
  const streamsRef = collection(db, 'streams');
  const getStreams = async () => {
    try {
      const data = await getDocs(streamsRef);
      let filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      filteredData = filteredData.filter(
        (item: any) =>
          new Date((item.dateTime.seconds - 1800) * 1000).getSeconds() <=
          new Date().getSeconds()
      );
      let otherData = filteredData.filter(
        (item: any, id: any) =>
          new Date((item.dateTime.seconds - 1800) * 1000).getSeconds() >
          new Date().getSeconds()
      );
      setStreamData(filteredData);
      setOtherStreamData(otherData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStreams();
  }, []);

  return (
    <div className={classes.list_container}>
      <br />{' '}
      {streamsData ? (
        <>
          {streamsData.length > 0 &&
          streamsData[router.query.eventId].streamLink ? (
            <div
              style={{
                width: '100%',
                height: '450px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowY: 'hidden',
              }}
            >
              <iframe
                width="700"
                height="400"
                src={
                  streamsData.length > 0
                    ? streamsData[router.query.eventId].streamLink
                    : ''
                }
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Text color="#fff" textAlign="center" w="full" mt="20">
              {currentStream} will be live 30 minutes to kickoff{' '}
            </Text>
          )}

          {/* <VStack w={{ base: '90%', md: '70%' }} mx="auto" mt="8">
            <Box
              w="full"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="#fff" fontWeight="bold" fontFamily="Work Sans">
                Other Streams
              </Text>
              <chakra.span
                w={{ base: 'calc(100% - 100px)', md: 'calc(100% - 200px)' }}
                h="0.5"
                bg="#fff"
              ></chakra.span>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              w="full"
            >
              {otherStreamsData.length > 0 ? (
                otherStreamsData?.map((item: any) => (
                  <Text
                    key={item.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py="3"
                    px="3"
                    fontWeight="bold"
                    fontFamily="Work Sans"
                    fontSize="md"
                    minW={{ base: 'full', md: '350px' }}
                    color="#fff"
                    bg="#1E1B1B"
                    _hover={{ bg: '#1e1b1b' }}
                    borderRadius="10px"
                    position="relative"
                    my="1"
                    textTransform="capitalize"
                  >
                    {item.title}{' '}
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
                      <Link href={`/app/live`}>Watch</Link>
                    </chakra.span>
                  </Text>
                ))
              ) : (
                <h1
                  style={{ color: '#fff', textAlign: 'center', width: '100%' }}
                >
                  No Other live stream available at the moment
                </h1>
              )}
            </Box>
          </VStack> */}
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

EventStream.PageLayout = AppWrapper;

export default EventStream;
