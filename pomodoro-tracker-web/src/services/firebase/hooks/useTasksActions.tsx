import { v4 as uuidv4 } from 'uuid';

import * as tasksCollection from '../collections/tasksCollection';
import { useAppContext } from '../../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../../store/Tasks.reducers';

function useTasksActions() {
  const { dispatch, state } = useAppContext();

  const getTasks = async () => {
    let tasks: Task[] = [];

    try {
      if (state.user) {
        const tasksSnapshot = await tasksCollection.getTasks();

        if (tasksSnapshot.docs.length > 1) {
          tasks = tasksSnapshot.docs.map((doc) => ({
            ...(doc.data() as Task),
            id: doc.id,
          }));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error getting tasks: ', error);
    } finally {
      dispatch({
        type: TASK_ACTIONS.SET_TASKS,
        payload: tasks,
      });
    }
  };

  const createTask = async (task: Task) => {
    const newTask = { ...task };

    try {
      if (state.user) {
        const doc = await tasksCollection.createTask(task, state.user);

        if (!doc) throw new Error('Firebase doc not retrieved');
        newTask.id = doc.id;
      } else {
        newTask.id = uuidv4();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating task: ', error);
    } finally {
      dispatch({
        type: TASK_ACTIONS.ADD_TASK,
        payload: newTask,
      });
    }
  };

  const updateTask = async (task: Task) => {
    const newTask = { ...task };

    try {
      if (state.user) {
        const taskSnapshot = await tasksCollection.getTask(task);

        if (!taskSnapshot.exists) {
          const doc = await tasksCollection.createTask(task, state.user);
          if (!doc) throw new Error('Firebase doc not retrieved');
          newTask.id = doc.id;
        } else {
          await tasksCollection.updateTask(newTask);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating task: ', error);
    } finally {
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK,
        payload: task,
      });
    }
  };

  const deleteTask = (task: Task) => {
    try {
      tasksCollection.deleteTask(task);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting task: ', error);
    } finally {
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK,
        payload: { id: task.id },
      });
    }
  };

  return {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
  };
}

export default useTasksActions;
