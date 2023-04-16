import React, { useState } from 'react';
import BottomNav from '@/components/BottomNav/BottomNav';
import classes from '@/styles/home/index.module.css';
import { Select, Flex } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { pageIcons } from '@/assets';
import { Input, Tooltip } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { PageLayoutProps } from '../_app';
import PageHead from '@/components/PageHead/PageHead';
import { categoryLinkData } from '@/data';
import { useRouter } from 'next/router';

const BaseScreen = ({ children }: { children: React.ReactNode }) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('Lagos');
  const router = useRouter();

  const handleChange = (e: any) => {
    setValue(e);
    setShowInput(false);
  };

  return (
    <div className={classes.baseScreen}>
      <PageHead title="Home" />
      <div className={classes.selections}>
        {showInput ? (
          <Select
            placeholder="Your Location"
            searchable
            value={value}
            onChange={handleChange}
            data={['Lagos', 'New York', 'Paris', 'Toronto']}
            className={classes.select}
            variant="unstyled"
            transitionProps={{
              transition: 'pop-top-left',
              duration: 80,
              timingFunction: 'ease',
            }}
            nothingFound="Not Found"
          />
        ) : (
          <p onClick={() => setShowInput(true)}>
            {value} <IconChevronDown size={18} stroke={1.5} />{' '}
          </p>
        )}
        <Image src={pageIcons.profileIcon} alt="profile" width="25" />
      </div>
      <div className={classes.inputs}>
        <div>
          <Image src={pageIcons.searchIcon} alt="search" width="18" />
          <input
            type="text"
            placeholder="Team, performer or venue"
            className={classes.input}
          />
          <Image src={pageIcons.filterIcon} alt="filter" width="18" />
        </div>
        <div className={classes.categories}>
          {categoryLinkData.map((item, id) => (
            <Link
              href={item.url}
              key={id}
              style={{
                background: router.pathname.includes(item.url)
                  ? '#F4ED35'
                  : '#D9D9D9',
                fontWeight: router.pathname.includes(item.url)
                  ? 'bold'
                  : 'normal',
              }}
            >
              <div>
                <Image
                  src={item.image}
                  alt={item.name}
                  className={classes.links}
                />
              </div>
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      {children}
      <BottomNav />
    </div>
  );
};

export default BaseScreen;
