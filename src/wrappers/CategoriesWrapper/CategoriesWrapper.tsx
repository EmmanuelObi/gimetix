import React from 'react';
import classes from './categories.module.css';

const CategoriesWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.categoriesContainer}>{children}</div>;
};

export default CategoriesWrapper;
