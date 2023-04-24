import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

const useAuth = () => {
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredential) =>
        setDoc(doc(db, 'users', userCredential.user.uid), {
          firstname: '',
          lastname: '',
          username: userCredential.user.displayName,
          password: '',
          email: userCredential.user.email,
          isSubscriber: false,
        })
      );
      router.push('/app');
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
      notifications.show({
        id: 'sign-out',
        color: 'indigo',
        title: 'Success',
        message: 'Logged Out',
        autoClose: 5000,
        withCloseButton: false,
      });
      router.push('/auth');
    } catch (err: any) {
      notifications.show({
        id: 'sign-out',
        color: 'red',
        title: 'Error',
        message: err.message,
        autoClose: 3000,
        withCloseButton: false,
      });
    }
  };

  const addUser = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.username,
        password: data.password,
        email: data.email,
        isSubscriber: false,
      });
    } catch (err) {
      console.log({ err });
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
