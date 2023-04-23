import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

const useAuth = () => {
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/app/live');
      notifications.show({
        id: 'sign-in',
        color: 'indigo',
        title: 'Success',
        message: "You're all set",
        autoClose: 5000,
        withCloseButton: false,
      });
    } catch (err: any) {
      notifications.show({
        id: 'sign-in',
        color: 'red',
        title: 'Error',
        message: err.message,
        autoClose: 3000,
        withCloseButton: false,
      });
    }
  };
  const signInWithEmailandPassword = async (data: any) => {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  };
  const signUpWithEmailandPassword = async (data: any) =>
    await createUserWithEmailAndPassword(auth, data.email, data.password);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (data: any) => {
    const usersCollectionRef = collection(db, 'users');

    try {
      await addDoc(usersCollectionRef, {
        firstname: data.firstName,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
        email: data.email,
        isSubscriber: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const verifyEmail = async () =>
    await sendEmailVerification(auth.currentUser!);

  return {
    signUpWithEmailandPassword,
    addUser,
    signInWithGoogle,
    verifyEmail,
    logOut,
    signInWithEmailandPassword,
  };
};

export default useAuth;
