import React from 'react';
import classes from './ListCard.module.css';
import Image from 'next/image';
import { sportAssets } from '@/assets';
import Link from 'next/link';

interface IListCardProps {
  id: number;
  item: { host: string; dateLocation: string; price: string; image: string };
  isLive: boolean;
}

const ListCard = ({ id, item, isLive }: IListCardProps) => {
  const { host, dateLocation, image } = item;
  return (
    <Link href={`/app/live/${id + 1}`} className={classes.list_card}>
      {isLive ? <p className={classes.live_area}>LIVE</p> : null}
      <Image
        src={image}
        alt={`event-${id + 1}`}
        className={classes.listImage}
      />

      <div className={classes.info}>
        <p>{host}</p>
        <span>{isLive ? 'Streaming' : dateLocation}</span>
      </div>
    </Link>
  );
};

export default ListCard;
