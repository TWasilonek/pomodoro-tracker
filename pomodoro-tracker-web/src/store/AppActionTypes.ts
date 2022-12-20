import { AuthActions } from './auth/Auth.reducers';
import { TasksActions } from './tasks/Tasks.reducers';
import { UserActions } from './user/User.reducers';

export type AppActionTypes = TasksActions | UserActions | AuthActions;
