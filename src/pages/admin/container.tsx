import { AdminNav } from '@/components/Admin/AdminNav/AdminNav';
import { auth } from '@/config/firebase';
import { HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Admin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <HStack w="full" align="start" overflow="hidden" minH="100vh">
      <AdminNav />
      {children}
    </HStack>
  );
};

export default Admin;
