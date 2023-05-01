import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import React, { useEffect, useState } from 'react';
import classes from '@/styles/app/list.module.css';
import { ListData } from '@/data';
import ListCard from '@/components/ListCard/ListCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { VStack } from '@chakra-ui/react';

const Live = () => {
  const [streamsData, setStreamData] = useState<any>();
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
      setStreamData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStreams();
  }, []);
  return (
    <div className={classes.list_container}>
      {streamsData?.length > 0 ? (
        streamsData?.map((item: any, id: any) => (
          <ListCard id={id} key={id} item={item} isLive={true} />
        ))
      ) : (
        <VStack w="full" align="center" p="10">
          <h1 style={{ color: '#fff' }}>No live games at the moment</h1>
        </VStack>
      )}
    </div>
  );
};

Live.PageLayout = AppWrapper;

export default Live;
