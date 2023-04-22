import React, { useState } from 'react';
import { IconBrandGoogle, IconMailFilled } from '@tabler/icons-react';
import classes from '@/styles/auth/index.module.css';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

const Signin = () => {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,

      username: (val) =>
        val.length <= 3
          ? 'Username should include at least 3 characters'
          : null,
    },
  });
  return (
    <div className={classes.signup_container}>
      <div className={classes.content}>
        <h2>Sign In to GMTX </h2>
        <Button
          leftIcon={<IconBrandGoogle size="22px" />}
          color="dark"
          mih="45px"
          miw="300px"
          radius="20px"
        >
          Continue with Google
        </Button>
        {isSelected ? (
          <>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue('username', event.currentTarget.value)
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue('password', event.currentTarget.value)
                }
              />
            </div>
            <Button
              color="indigo"
              mih="45px"
              miw="300px"
              radius="20px"
              onClick={() => router.push('/app/live')}
            >
              Sign In
            </Button>
          </>
        ) : (
          <Button
            leftIcon={<IconMailFilled size="22px" />}
            color="indigo"
            mih="45px"
            miw="300px"
            radius="20px"
            onClick={() => setIsSelected(true)}
          >
            Continue with Email
          </Button>
        )}

        <p>
          Don&apos;t have an account? <Link href="/auth">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
