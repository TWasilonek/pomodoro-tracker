import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useReducer,
  useContext,
} from 'react';

import { firebaseAuth } from '../services/firebase';
import * as usersCollection from '../services/firebase/collections/usersCollection';
import { AppActionTypes } from './AppActionTypes';
import { authReducer, AuthResponse } from './Auth.reducers';
import { Task, tasksReducer } from './Tasks.reducers';
import { User, userReducer, USER_ACTIONS } from './User.reducers';

export interface InitialStateType {
  tasks: Task[];
  user: User | null;
  auth: AuthResponse;
}

export const initialState: InitialStateType = {
  tasks: [],
  user: null,
  auth: { loggedIn: false },
};

export interface AppContextType {
  state: InitialStateType;
  dispatch: React.Dispatch<AppActionTypes>;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { tasks, user, auth }: InitialStateType,
  action: AppActionTypes
) => ({
  tasks: tasksReducer(tasks, action),
  user: userReducer(user, action),
  auth: authReducer(auth, action),
});

export const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    const unsuscribeFromAuth = firebaseAuth.onAuthStateChanged(
      async (userAuth) => {
        if (!userAuth) {
          dispatch({
            type: USER_ACTIONS.SET_USER,
            payload: null,
          });
          return;
        }

        // get user
        const userRef = await usersCollection.createUserProfileDocument(
          userAuth
        );
        if (userRef) {
          userRef.onSnapshot((snapshot) => {
            dispatch({
              type: USER_ACTIONS.SET_USER,
              // @ts-ignore
              payload: { uid: snapshot.id, ...snapshot.data() },
            });
          });
        }
      }
    );

    return () => {
      unsuscribeFromAuth();
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
