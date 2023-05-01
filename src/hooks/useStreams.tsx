import { db } from '@/config/firebase';
import { notifications } from '@mantine/notifications';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { useState } from 'react';

const useStreams = () => {
  const [streamsData, setStreamData] = useState<any>();
  const [formLoading, setFormLoading] = useState(false);
  const streamsRef = collection(db, 'streams');
  const getStreams = async () => {
    try {
      const data = await getDocs(streamsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStreamData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const addStream = async (data: any, e: any, form: any, closeModal: any) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      await addDoc(streamsRef, {
        title: data.title,
        genre: data.genre,
        imageUrl: data.imageUrl,
        streamLink: data.streamLink,
        dateTime: data.dateTime,
      });
      form.reset();
      closeModal();
      getStreams();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const deleteStream = async (id: any) => {
    const streamDoc = doc(db, 'streams', id);
    try {
      await deleteDoc(streamDoc);
      notifications.show({
        id: 'delete',
        color: 'indigo',
        title: 'Success',
        message: 'Stream Deleted',
        autoClose: 3000,
        withCloseButton: false,
      });
      getStreams();
    } catch (err) {
      console.error(err);
      notifications.show({
        id: 'upload',
        color: 'red',
        title: 'Error',
        message: 'Failed to delete',
        autoClose: 3000,
        withCloseButton: false,
      });
    }
  };

  const updateStream = async (
    data: any,
    e: any,
    id: any,
    form: any,
    onClose: any
  ) => {
    e.preventDefault();
    setFormLoading(true);
    const changes: any = {};

    for (let item in data) {
      if (data[item] !== '') {
        changes[item] = data[item];
      }
    }

    try {
      setFormLoading(true);
      const streamDoc = doc(db, 'streams', id);
      await updateDoc(streamDoc, changes).then(() => getStreams());

      form.reset();
      onClose();
      notifications.show({
        id: 'update',
        color: 'indigo',
        title: 'Success',
        message: 'Stream Updated',
        autoClose: 3000,
        withCloseButton: false,
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        id: 'update',
        color: 'red',
        title: 'Error',
        message: 'Update failed',
        autoClose: 3000,
        withCloseButton: false,
      });
    } finally {
      setFormLoading(false);
    }
  };

  return {
    streamsData,
    getStreams,
    formLoading,
    addStream,
    deleteStream,
    updateStream,
  };
};

export default useStreams;
