import firebase, { firestore } from '../firebase';

const hasData = (userData: firebase.firestore.DocumentData | undefined) =>
  userData && userData.displayName && userData.email && userData.photoURL;

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

export const updateUserProfileDocument = async (
  user: firebase.User,
  additionalData?: any
) => {
  if (!user) return null;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();
  const savedUserData = snapshot.data();

  if (!hasData(savedUserData)) {
    const { displayName, email, photoURL } = user;
    const updatedAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        updatedAt,
        ...additionalData,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating the user', error);
    }
  }
  return getUserDocument(user.uid);
};
