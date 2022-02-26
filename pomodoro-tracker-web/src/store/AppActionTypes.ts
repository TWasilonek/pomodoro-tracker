import { AuthActions } from './Auth.reducers';
import { TasksActions } from './Tasks.reducers';
import { UserActions } from './User.reducers';

export type AppActionTypes = TasksActions | UserActions | AuthActions;
