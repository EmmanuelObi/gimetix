import React, { useState, useEffect } from 'react';
import classes from '@/styles/auth/index.module.css';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { pageIcons } from '@/assets';
import Image from 'next/image';
import { auth } from '@/config/firebase';
import useAuth from '@/hooks/useAuth';

const Verify = () => {
  const { verifyEmail } = useAuth();
  const router = useRouter();
  const verifyCode = () => {
    setTimeout(() => router.push('/app/live'), 3000);
  };

  return (
    <div className={classes.signup_container}>
      {auth?.currentUser?.emailVerified ? (
        <div className={classes.marked}>
          <Image src={pageIcons.markedIcon} alt="marked" />
          <p>Email Verified</p>
        </div>
      ) : (
        <div className={classes.content}>
          <h2>Check your mail for a verification Link</h2>

          <p onClick={verifyEmail}>Resend verification email</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
