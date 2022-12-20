import * as functions from "firebase-functions";
import "firebase/firestore";

import { getUserData } from "./utils";

export const createUserProfile = functions.auth
  .user()
  .onCreate(async (request) => {
    const { ref: userRef } = await getUserData(request.uid);
    const { email, displayName, photoURL } = request;

    return userRef.set({
      email: email || "",
      photo: photoURL || "",
      displayName,
      createdAt: new Date(),
    });
  });
