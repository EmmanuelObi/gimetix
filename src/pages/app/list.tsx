import ListCard from '@/components/ListCard/ListCard';
import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import React, { useEffect, useState } from 'react';
import classes from '@/styles/app/list.module.css';
import { ListData } from '@/data';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

const List = () => {
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
    <div className={classes.list_container}>
      {streamsData?.map((item: any, id: any) => (
        <ListCard id={id} key={id} item={item} isLive={false} />
      ))}
    </div>
  );
};

List.PageLayout = AppWrapper;

export default List;
