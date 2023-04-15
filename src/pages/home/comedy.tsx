import EventCard from '@/components/EventCard/EventCard';
import { comedyData } from '@/data';
import CategoriesWrapper from '@/wrappers/CategoriesWrapper/CategoriesWrapper';
import React from 'react';
import BaseScreen from './index';

const Comedy = () => {
  return (
    <CategoriesWrapper>
      {comedyData.map((item, id) => (
        <EventCard key={id} id={id} item={item} eventType="comedy" />
      ))}
    </CategoriesWrapper>
  );
};
Comedy.PageLayout = BaseScreen;
export default Comedy;
