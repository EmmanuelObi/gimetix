import React, { useState } from 'react';
import { IconBrandGoogle, IconMailFilled } from '@tabler/icons-react';
import classes from '@/styles/auth/index.module.css';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { auth } from '@/config/firebase';
import { IconCheck, IconLockCancel } from '@tabler/icons-react';

const SignUp = () => {
  const { signUpWithEmailandPassword, addUser, verifyEmail, signInWithGoogle } =
    useAuth();
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      firstName: (val) =>
        val.length < 3
          ? 'First Name should include at least 3 characters'
          : null,
      lastName: (val) =>
        val.length < 3
          ? 'Last Name should include at least 3 characters'
          : null,
      username: (val) =>
        val.length < 3 ? 'Username should include at least 3 characters' : null,
    },
  });

  const handleSubmit = async (data: any, e: any) => {
    e.preventDefault();
    setLoading(true);
    notifications.show({
      id: 'sign-up',
      loading: true,
      title: 'Signing Up',
      message: 'Preparing you for take off..',
      autoClose: false,
      withCloseButton: false,
    });
    await signUpWithEmailandPassword(data)
      .then(() => addUser(data))
      .then(() => {
        verifyEmail();
        form.reset();
        notifications.update({
          id: 'sign-up',
          color: 'indigo',
          title: 'Verify Email',
          message: 'Check Mail for Verification Link',
          icon: <IconCheck size="1rem" />,
          autoClose: 10000,
          withCloseButton: false,
        });
        router.push('/auth/signin');
      })
      .catch((err) =>
        notifications.update({
          id: 'sign-up',
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
        <h2>Create your GMTX account</h2>
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
                type="text"
                placeholder="First Name"
                value={form.values.firstName}
                onChange={(event) =>
                  form.setFieldValue('firstName', event.currentTarget.value)
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.values.lastName}
                onChange={(event) =>
                  form.setFieldValue('lastName', event.currentTarget.value)
                }
              />
              <input
                type="text"
                placeholder="Username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue('username', event.currentTarget.value)
                }
              />
              <input
                type="email"
                placeholder="johndoe@mmm.com"
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
                radius="20px"
                type="submit"
                loading={loading}
                loaderPosition="left"
              >
                Sign Up
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
          Already have an account? <Link href="auth/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
