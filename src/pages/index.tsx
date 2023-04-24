import { Work_Sans, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import styles from '@/styles/Home.module.css';
import PageHead from '@/components/PageHead/PageHead';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '@/config/firebase';

export const workSans = Work_Sans({ subsets: ['latin'] });

export default function Home() {
  let timeout: any = null;

  const router = useRouter();
  const line1 = 'GMTX';
  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        delay: 0.9,
        staggerChildren: 0.22,
      },
    },
  };

  const letter = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      duration: 5,
      opacity: 1,
      y: 0,
    },
  };

  const handleSplash = () => {
    timeout = setTimeout(() => {
      if (auth.currentUser) {
        router.push('app');
      } else {
        router.push('auth');
      }
    }, 5000);
  };

  useEffect(() => {
    handleSplash();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <PageHead />
      <main className={styles.main}>
        <div className={styles.center}>
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className={workSans.className}
          >
            {line1.split('').map((char, index) => (
              <motion.span key={char + '-' + index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </main>
    </>
  );
}
