import React, { useState } from 'react';
import classes from '@/styles/auth/index.module.css';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { pageIcons } from '@/assets';
import Image from 'next/image';

const Verify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const verifyCode = () => {
    setIsVerified(true);

    setTimeout(() => router.push('/app/live'), 3000);
  };
  const form = useForm({
    initialValues: {
      token: '',
    },

    validate: {
      token: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  return (
    <div className={classes.signup_container}>
      {isVerified ? (
        <div className={classes.marked}>
          <Image src={pageIcons.markedIcon} alt="marked" />
          <p>Email Verified</p>
        </div>
      ) : (
        <div className={classes.content}>
          <h2>Verify your email</h2>
          <div>
            <input
              type="text"
              placeholder="Enter Code"
              value={form.values.token}
              onChange={(event) =>
                form.setFieldValue('token', event.currentTarget.value)
              }
            />
          </div>
          <Button
            color="indigo"
            mih="45px"
            miw="300px"
            radius="20px"
            onClick={verifyCode}
          >
            Verify
          </Button>

          <p>Resend verification email</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
