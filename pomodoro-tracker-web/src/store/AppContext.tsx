import React, {
  createContext,
  useEffect,
  useReducer,
  useContext,
  FC,
} from 'react';

import { firebaseAuth } from '../services/firebase';
import * as usersCollection from '../services/firebase/collections/usersCollection';
import { AppActionTypes } from './AppActionTypes';
import { authReducer, AuthResponse } from './auth/Auth.reducers';
import { Task, tasksReducer } from './tasks/Tasks.reducers';
import { User, userReducer, USER_ACTIONS } from './user/User.reducers';

export interface InitialStateType {
  tasks: Task[];
  user: User | null;
  auth: AuthResponse;
}

export const defaultState: InitialStateType = {
  tasks: [],
  user: null,
  auth: { loggedIn: false },
};

export interface AppContextType {
  state: InitialStateType;
  dispatch: React.Dispatch<AppActionTypes>;
}

export const AppContext = createContext<AppContextType>({
  state: defaultState,
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

type Props = {
  initialState?: InitialStateType;
};

export const AppProvider: FC<Props> = ({
  children,
  initialState = defaultState,
}) => {
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

        const userRef = await usersCollection.updateUserProfileDocument(
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
