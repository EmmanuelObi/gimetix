import { UserTable } from '@/components/Admin/UserTable/UserTable';
import { db } from '@/config/firebase';
import { Text, VStack } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Admin from './container';

const Users = () => {
  const [userData, setUserData] = useState<any>();
  const usersRef = collection(db, 'users');
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserData(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, []);

  console.log({ userData });
  return (
    <VStack w="full" minH="100vh" bg="#fff" spacing="10" p="10">
      {userData ? (
        <>
          <Text color="black" fontWeight="bold" fontSize="lg">
            User Table ({userData?.length})
          </Text>
          <UserTable data={userData} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </VStack>
  );
};

Users.PageLayout = Admin;
export default Users;
