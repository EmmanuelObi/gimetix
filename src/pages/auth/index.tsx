import React, { useState } from 'react';
import { IconBrandGoogle, IconMailFilled } from '@tabler/icons-react';
import classes from '@/styles/auth/index.module.css';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [isSelected, setIsSelected] = useState(false);
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
        val.length <= 3
          ? 'First Name should include at least 3 characters'
          : null,
      lastName: (val) =>
        val.length <= 3
          ? 'Last Name should include at least 3 characters'
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
        <h2>Create your GMTX account</h2>
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
            </div>
            <Button
              color="indigo"
              mih="45px"
              miw="300px"
              radius="20px"
              onClick={() => router.push('/auth/verify')}
            >
              Sign Up
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
          Already have an account? <Link href="auth/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
