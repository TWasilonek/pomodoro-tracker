import { ActionMap } from '../types';

export interface Task {
  id: string;
  description: string;
  category?: string;
  // FIXME: Good for quick calculations, but not feasible in the long run
  // change to pomodoros array with 'completed' atrr
  pomodoroCount: number;
  completedCount: number;
}

// FIXME: easy to read and use but not the best architectural approach in terms of feasibility.
// Modes might be decided by components individually based on data.
export enum TASK_MODES {
  COMPLETED = 'completed',
  TODO = 'todo',
}

export enum TASK_ACTIONS {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  ADD_POMODORO = 'ADD_POMODORO',
  DELETE_POMODORO = 'DELETE_POMODORO',
  COMPLETE_POMODORO = 'COMPLETE_POMODORO',
}

type TasksPayload = {
  [TASK_ACTIONS.ADD_TASK]: Task;
  [TASK_ACTIONS.UPDATE_TASK]: Task;
  [TASK_ACTIONS.DELETE_TASK]: { id: string };
  [TASK_ACTIONS.ADD_POMODORO]: { id: string };
  [TASK_ACTIONS.DELETE_POMODORO]: { id: string };
  [TASK_ACTIONS.COMPLETE_POMODORO]: { id: string };
};

export type TasksActions =
  ActionMap<TasksPayload>[keyof ActionMap<TasksPayload>];

const addTask = (state: Task[], task: Task) => [
  ...state,
  {
    id: task.id,
    description: task.description,
    category: task.category,
    pomodoroCount: task.pomodoroCount,
    completedCount: task.completedCount,
  },
];

const updateTask = (state: Task[], newTask: Task) =>
  state.map((task) => {
    if (task.id === newTask.id) {
      return {
        ...newTask,
      };
    }
    return task;
  });

const deleteTask = (state: Task[], id: string) => [
  ...state.filter((task) => task.id !== id),
];

const addPomodoro = (state: Task[], id: string) =>
  state.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        pomodoroCount: task.pomodoroCount + 1,
      };
    }
    return task;
  });

const removePmodoro = (state: Task[], id: string) =>
  state.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        pomodoroCount: task.pomodoroCount - 1,
      };
    }
    return task;
  });

const completePomodoro = (state: Task[], id: string) =>
  state.map((task) => {
    if (task.id === id) {
      const updatedTask = { ...task };
      if (task.pomodoroCount > 0) {
        updatedTask.pomodoroCount = task.pomodoroCount - 1;
        updatedTask.completedCount = task.completedCount + 1;
      }
      return updatedTask;
    }
    return task;
  });

export const tasksReducer = (state: Task[], action: TasksActions) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK:
      return addTask(state, action.payload);
    case TASK_ACTIONS.UPDATE_TASK:
      return updateTask(state, action.payload);
    case TASK_ACTIONS.DELETE_TASK:
      return deleteTask(state, action.payload.id);
    case TASK_ACTIONS.ADD_POMODORO:
      return addPomodoro(state, action.payload.id);
    case TASK_ACTIONS.DELETE_POMODORO:
      return removePmodoro(state, action.payload.id);
    case TASK_ACTIONS.COMPLETE_POMODORO:
      return completePomodoro(state, action.payload.id);
    default:
      return state;
  }
};
