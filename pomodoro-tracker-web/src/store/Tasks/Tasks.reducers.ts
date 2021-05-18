import { ActionMap } from "../../types";

export interface Task {
  id: string;
  description: string;
  category?: string;
  pomodoroCount: number;
}

export enum TASK_ACTIONS {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  ADD_POMODORO = 'ADD_POMODORO',
  DELETE_POMODORO = 'DELETE_POMODORO',
}

type TasksPayload = {
  [TASK_ACTIONS.ADD_TASK]: Task;
  [TASK_ACTIONS.UPDATE_TASK]: Task;
  [TASK_ACTIONS.DELETE_TASK]: { id: string };
  [TASK_ACTIONS.ADD_POMODORO]: { id: string };
  [TASK_ACTIONS.DELETE_POMODORO]: { id: string }; 
}

export type TasksActions = ActionMap<TasksPayload>[keyof ActionMap<TasksPayload>];

export const tasksReducer = (state: Task[], action: TasksActions) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK:
    case TASK_ACTIONS.UPDATE_TASK:
      return [
        ...state,
        {
          id: action.payload.id,
          description: action.payload.description,
          category: action.payload.category,
          pomodoroCount: action.payload.pomodoroCount,
        },
      ];
    case TASK_ACTIONS.DELETE_TASK:
      return [
        ...state.filter(task => task.id !== action.payload.id),
      ];
    case TASK_ACTIONS.ADD_POMODORO:
      return state.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            pomodoroCount: task.pomodoroCount + 1,
          };
        }
        return task;
      });
    case TASK_ACTIONS.DELETE_POMODORO:
      return state.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            pomodoroCount: task.pomodoroCount - 1,
          };
        }
        return task;
      });
    default:
      return state;
  }
}