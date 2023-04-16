import EventCard from '@/components/EventCard/EventCard';
import { comedyData, concertData, sportData } from '@/data';
import CategoriesWrapper from '@/wrappers/CategoriesWrapper/CategoriesWrapper';
import React from 'react';
import BaseScreen from './index';
import classes from '@/styles/home/discover.module.css';
import { IconChevronRight } from '@tabler/icons-react';
import { CarouselCard } from '@/components/EventCarousel';

const Discover = () => {
  return (
    <CategoriesWrapper>
      <div className={classes.topLevel}>
        <p>This Weekend</p>
        <p>
          View All <IconChevronRight size={15} stroke={2.5} />
        </p>
      </div>
      <div className={classes.slider}>
        {sportData.map((item, id) => (
          <EventCard key={id} id={id} item={item} eventType="sports" />
        ))}
      </div>

      <div className={classes.topLevel}>
        <p>Top Selling</p>
        <p>
          View All <IconChevronRight size={15} stroke={2.5} />
        </p>
      </div>
      <div className={classes.slider}>
        {comedyData.map((item, id) => (
          <EventCard key={id} id={id} item={item} eventType="comedy" />
        ))}
      </div>

      <div className={classes.topLevel}>
        <p>Newly Announced</p>
        <p>
          View All <IconChevronRight size={15} stroke={2.5} />
        </p>
      </div>
      <div className={classes.slider}>
        {concertData.map((item, id) => (
          <EventCard key={id} id={id} item={item} />
        ))}
      </div>
    </CategoriesWrapper>
  );
};
Discover.PageLayout = BaseScreen;
export default Discover;
