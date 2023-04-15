import EventCard from '@/components/EventCard/EventCard';
import { sportData } from '@/data';
import CategoriesWrapper from '@/wrappers/CategoriesWrapper/CategoriesWrapper';
import React from 'react';
import BaseScreen from './index';

const Sports = () => {
  return (
    <CategoriesWrapper>
      {sportData.map((item, id) => (
        <EventCard key={id} id={id} item={item} eventType="sports" />
      ))}
    </CategoriesWrapper>
  );
};
Sports.PageLayout = BaseScreen;
export default Sports;
