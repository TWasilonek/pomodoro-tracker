import omit from 'lodash/omit';
import { Task } from '../../../store/Tasks.reducers';
import { User } from '../../../store/User.reducers';
import { firestore, firebaseAuth } from '../firebase';

export const createTask = async (task: Task, user: User) => {
  if (!firebaseAuth.currentUser) {
    throw Error('User is not logged in.');
  }

  const docRef = await firestore
    .collection('users')
    .doc(firebaseAuth.currentUser.uid)
    .collection('tasks')
    .add({ ...omit(task, 'id'), user });
  const doc = await docRef.get();
  return doc;
};

export const updateTask = (task: Task) => {
  if (!firebaseAuth.currentUser) {
    throw Error('User is not logged in.');
  }

  return firestore
    .collection('users')
    .doc(firebaseAuth.currentUser.uid)
    .collection('tasks')
    .doc(task.id)
    .update(task);
};

export const deleteTask = (task: Task) => {
  if (!firebaseAuth.currentUser) {
    throw Error('User is not logged in.');
  }

  return firestore
    .collection('users')
    .doc(firebaseAuth.currentUser.uid)
    .collection('tasks')
    .doc(task.id)
    .delete();
};

export const getTask = async (task: Task) => {
  if (!firebaseAuth.currentUser) {
    throw Error('User is not logged in.');
  }

  const ref = await firestore
    .collection('users')
    .doc(firebaseAuth.currentUser.uid)
    .collection('tasks')
    .doc(task.id);

  const snapshot = await ref.get();
  return snapshot;
};

export const getTasks = () => {
  if (!firebaseAuth.currentUser) {
    throw Error('User is not logged in.');
  }

  return firestore
    .collection('users')
    .doc(firebaseAuth.currentUser.uid)
    .collection('tasks')
    .get();
};
