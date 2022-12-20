import { ActionMap } from '../../types';
import { AppActionTypes } from '../AppActionTypes';

export type AuthResponse = {
  loggedIn: boolean;
  error?: any;
};

export enum AUTH_ACTIONS {
  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAIL = 'SIGN_IN_FAIL',
  SIGN_OUT = 'SIGN_OUT',
}

type AuthPayload = {
  [AUTH_ACTIONS.SIGN_IN_START]: undefined;
  [AUTH_ACTIONS.SIGN_IN_SUCCESS]: undefined;
  [AUTH_ACTIONS.SIGN_IN_FAIL]: { error: any };
  [AUTH_ACTIONS.SIGN_OUT]: undefined;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: AuthResponse, action: AppActionTypes) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_IN_SUCCESS:
      return { loggedIn: true };
    case AUTH_ACTIONS.SIGN_IN_FAIL:
      return { loggedIn: false, error: action.payload.error };
    case AUTH_ACTIONS.SIGN_OUT:
      return { loggedIn: false };
    case AUTH_ACTIONS.SIGN_IN_START:
    default:
      return state;
  }
};
