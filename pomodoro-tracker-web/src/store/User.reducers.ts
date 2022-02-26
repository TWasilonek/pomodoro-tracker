import firebase from '../services/firebase';
import { ActionMap } from '../types';
import { AppActionTypes } from './AppActionTypes';

export type WithUID = {
  uid: string;
};

export type User = firebase.User & WithUID;

export enum USER_ACTIONS {
  SET_USER = 'SET_USER',
}

type UserPayload = {
  [USER_ACTIONS.SET_USER]: User | null;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (state: User | null, action: AppActionTypes) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
