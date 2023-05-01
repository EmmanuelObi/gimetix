import React from 'react';
import classes from './ListCard.module.css';
import Image from 'next/image';
import { sportAssets } from '@/assets';
import Link from 'next/link';

interface IListCardProps {
  id: number;
  item: {
    host: string;
    dateLocation: string;
    price: string;
    image: any;
    link: string;
  };
  isLive: boolean;
}

const ListCard = ({ id, item, isLive }: any) => {
  const { title, dateTime, imageUrl, streamLink } = item;
  return (
    <Link
      href={isLive ? `/app/live/${id}` : '/app/live'}
      className={classes.list_card}
    >
      {isLive ? <p className={classes.live_area}>LIVE</p> : null}
      <Image
        src={imageUrl}
        alt={`event-${id + 1}`}
        className={classes.listImage}
        width="390"
        height="200"
      />

      <div className={classes.info}>
        <p>{title}</p>
        <span>
          {isLive
            ? 'Streaming'
            : new Date(dateTime.seconds * 1000).toLocaleString()}
        </span>
      </div>
    </Link>
  );
};

export default ListCard;
