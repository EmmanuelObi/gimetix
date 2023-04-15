import React from 'react';
import classes from './eventCard.module.css';
import Image from 'next/image';
import { pageIcons } from '@/assets';

interface IEventCardProps {
  id: number;
  item: { host: string; dateLocation: string; price: string; image: string };
  eventType?: string;
}
const EventCard = ({ id, item, eventType }: IEventCardProps) => {
  const { host, dateLocation, price, image } = item;

  const handleEventAssetType = (eventType: string) => {
    switch (eventType) {
      case 'comedy':
        return pageIcons.comicIcon;
      case 'sports':
        return pageIcons.ballIcon;
      case 'movies':
        return pageIcons.tvIcon;
    }
  };
  return (
    <div className={classes.eventcard}>
      <Image src={image} alt={`event-${id}`} className={classes.eventImage} />
      <div className={classes.eventType}>
        {eventType ? (
          <Image src={handleEventAssetType(eventType)} alt={`asset-${id}`} />
        ) : null}
        <div className={classes.info}>
          <p className={classes.hostName}>{host}</p>
          <div className={classes.locate_price}>
            <p className={classes.date}>{dateLocation}</p>
            <p className={classes.price}>
              <Image src={pageIcons.coinsIcon} alt={`coin${id}`} width="18" />{' '}
              &nbsp;
              {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
