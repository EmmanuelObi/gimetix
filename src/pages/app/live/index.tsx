import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import React from 'react';
import classes from '@/styles/app/list.module.css';
import { ListData } from '@/data';
import ListCard from '@/components/ListCard/ListCard';

const Live = () => {
  return (
    <div className={classes.list_container}>
      {[...ListData].slice(0, 4).map((item, id) => (
        <ListCard id={id} key={id} item={item} isLive={true} />
      ))}
    </div>
  );
};

Live.PageLayout = AppWrapper;

export default Live;
