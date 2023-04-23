import React, { useState } from 'react';
import { IconBrandGoogle, IconMailFilled } from '@tabler/icons-react';
import classes from '@/styles/auth/index.module.css';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import useAuth from '@/hooks/useAuth';
import { IconCheck, IconLockCancel } from '@tabler/icons-react';

const Signin = () => {
  const { signInWithEmailandPassword, signInWithGoogle } = useAuth();
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,

      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });
  const handleSubmit = async (data: any, e: any) => {
    e.preventDefault();
    setLoading(true);
    notifications.show({
      id: 'sign-in',
      loading: true,
      title: 'Signing In',
      message: 'Knocking down doors..',
      autoClose: false,
      withCloseButton: false,
    });

    signInWithEmailandPassword(data)
      .then(() => {
        notifications.update({
          id: 'sign-in',
          color: 'indigo',
          title: 'Success',
          message: "You're all set",
          icon: <IconCheck size="1rem" />,
          autoClose: 5000,
          withCloseButton: false,
        });
        router.push('/app/live');
      })
      .catch((err) =>
        notifications.update({
          id: 'sign-in',
          color: 'red',
          title: 'Error',
          message: err.message,
          icon: <IconLockCancel size="1rem" />,
          autoClose: 3000,
          withCloseButton: false,
        })
      );

    setLoading(false);
  };
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
          onClick={signInWithGoogle}
        >
          Continue with Google
        </Button>
        {isSelected ? (
          <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <input
                type="email"
                placeholder="Email"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue('email', event.currentTarget.value)
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
              <Button
                color="indigo"
                mih="45px"
                miw="300px"
                type="submit"
                radius="20px"
                loading={loading}
                loaderPosition="left"
              >
                Sign In
              </Button>
            </form>
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
