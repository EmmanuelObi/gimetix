import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import React, { useEffect, useState } from 'react';
import classes from '@/styles/app/list.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { VStack, Image, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
// import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { appActions } from '@/state/slices/appSlice';

const Live = () => {
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [streamsData, setStreamData] = useState<any>();
  const streamsRef = collection(db, 'streams');
  const getStreams = async () => {
    try {
      setPageLoading(true);
      const data = await getDocs(streamsRef);
      let filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      filteredData = filteredData.filter(
        (item: any) =>
          new Date((item.dateTime.seconds - 1800) * 1000).getSeconds() <=
          Math.floor(Date.now() / 1000)
      );
      setStreamData(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };
  useEffect(() => {
    dispatch(appActions.setCurrentStream(''));
    getStreams();
  }, []);

  if (pageLoading) return <Spinner color="#fff" size="lg" />;
  if (streamsData?.length === 0)
    return <h1 style={{ color: '#fff' }}>No live games at the moment</h1>;
  return (
    <div className={classes.list_container}>
      {streamsData?.length > 0
        ? streamsData.map((item: any, id: any) => (
            <Link
              key={id}
              href={`/app/live/${id}`}
              className={classes.body}
              onClick={() => dispatch(appActions.setCurrentStream(item.title))}
            >
              <Image
                src={item.imageUrl}
                alt="event"
                className={classes.eventImg}
              />
            </Link>
          ))
        : null}
    </div>
  );
};

Live.PageLayout = AppWrapper;

export default Live;
