import * as admin from "firebase-admin";
import { COLLECTIONS } from "./constants/constants";
import { UserProfile } from "./models/UserProfile";

export const db = admin.firestore();

export type GetDataType<T> = Promise<{
  data: T;
  ref: FirebaseFirestore.DocumentReference;
  docUrl: string;
}>;

export const getDocData = async <T>(
  docUrl: string
): Promise<GetDataType<T>> => {
  if (!docUrl)
    return {
      data: {} as T,
      ref: {} as FirebaseFirestore.DocumentReference,
      docUrl,
    };
  const userRef = db.doc(docUrl);
  const userSnap = await userRef.get();

  return {
    data: userSnap.data() as T,
    ref: userRef,
    docUrl,
  };
};

export const getUserData = async (
  userId: string | null
): Promise<GetDataType<UserProfile>> => {
  return getDocData<UserProfile>(`${COLLECTIONS.USERS}/${userId}`);
};
