import React, { createContext, FunctionComponent, useReducer } from "react";
import { Task, TasksActions, tasksReducer } from "./Tasks/Tasks.reducers";

export interface InitialStateType {
  tasks: Task[],
}

// type InitialStateType =  {
//   tasks: [],
//   // addTask: (task: Task) => {},
//   // removeTask: (task: Task) => {},
//   // updateTask: (task: Task) => {},
//   // addPomodoro: (taskId: string) => {},
//   // removePomodoro: (taskId: string) => {},
// }

export const initialState: InitialStateType = {
  tasks: [
    {
      id: "1",
      category: 'test',
      description: 'test',
      pomodoroCount: 3,
    },
    {
      id: "2",
      category: 'test 2',
      description: 'test 2',
      pomodoroCount: 1,
    },
  ],
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<TasksActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ tasks }: InitialStateType, action: TasksActions) => ({
  tasks: tasksReducer(tasks, action),
});

const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };


