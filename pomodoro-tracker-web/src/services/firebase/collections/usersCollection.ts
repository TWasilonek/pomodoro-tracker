import firebase, { firestore } from '../firebase';

const getUserDocument = async (
  uid: string
): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null> => {
  if (!uid) return null;

  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user', error);
    return null;
  }
};

export const createUserProfileDocument = async (
  user: firebase.User,
  additionalData?: any
) => {
  if (!user) return null;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating user', error);
    }
  }
  return getUserDocument(user.uid);
};
