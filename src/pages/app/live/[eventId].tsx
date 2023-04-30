import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import { Text, VStack, chakra, Box } from '@chakra-ui/react';
import React from 'react';
import classes from '@/styles/app/list.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const links: any = {
  a: 'https://weaksports.xyz/footy/ch13.php',
  b: 'https://weaksports.xyz/footy/ch5.php',
  c: 'https://weaksports.xyz/footy/ch12.php',
  d: 'https://weakstream.org/streams/badifgef',
  e: 'https://weaksports.xyz/footy/ch9.php',
};

const EventStream = () => {
  const router: any = useRouter();
  return (
    <div className={classes.list_container}>
      <br />{' '}
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
          src={links[router.query.eventId]}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <VStack w={{ base: '90%', md: '70%' }} mx="auto" mt="8">
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="#fff" fontWeight="bold" fontFamily="Work Sans">
            Upcoming Streams
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
          {/* <Text
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
            Brentford VS Not Forest{' '}
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
              <Link href={`/app/live/a`}>Watch</Link>
              Not live
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
            Brighton VS Wolves{' '}
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
              Not live
              <Link href={`/app/live/b`}>Watch</Link>
            </chakra.span>
          </Text> */}

          <Text
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
          >
            NY Knicks VS Miami Heat{' '}
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
              {/* <Link href={`/app/live/c`}>Watch</Link> */}
              Not live
            </chakra.span>
          </Text>
        </Box>
      </VStack>
    </div>
  );
};

EventStream.PageLayout = AppWrapper;

export default EventStream;
