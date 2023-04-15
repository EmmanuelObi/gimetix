import EventCard from '@/components/EventCard/EventCard';
import { moviesData } from '@/data';
import CategoriesWrapper from '@/wrappers/CategoriesWrapper/CategoriesWrapper';
import React from 'react';
import BaseScreen from './index';

const Movies = () => {
  return (
    <CategoriesWrapper>
      {moviesData.map((item, id) => (
        <EventCard key={id} id={id} item={item} eventType="movies" />
      ))}
    </CategoriesWrapper>
  );
};
Movies.PageLayout = BaseScreen;
export default Movies;
