import ListCard from '@/components/ListCard/ListCard';
import AppWrapper from '@/wrappers/AppWrapper/AppWrapper';
import React from 'react';
import classes from '@/styles/app/list.module.css';
import { ListData } from '@/data';

const List = () => {
  return (
    <div className={classes.list_container}>
      {ListData.map((item, id) => (
        <ListCard id={id} key={id} item={item} isLive={false} />
      ))}
    </div>
  );
};

List.PageLayout = AppWrapper;

export default List;
