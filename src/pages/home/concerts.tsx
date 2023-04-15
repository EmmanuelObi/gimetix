import React from 'react';
import BaseScreen from './index';
import EventCard from '@/components/EventCard/EventCard';
import { concertData } from '@/data';
import CategoriesWrapper from '@/wrappers/CategoriesWrapper/CategoriesWrapper';

const Concerts = () => {
  return (
    <CategoriesWrapper>
      {concertData.map((item, id) => (
        <EventCard key={id} id={id} item={item} />
      ))}
    </CategoriesWrapper>
  );
};

Concerts.PageLayout = BaseScreen;

export default Concerts;
