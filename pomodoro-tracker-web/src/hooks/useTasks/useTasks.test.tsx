import { renderHook } from '@testing-library/react-hooks';
import { FC } from 'react';
import { AppProvider } from '../../store/AppContext';
import { useTasks } from './useTasks';

const mockedState = {
  auth: { loggedIn: false },
  user: null,
  tasks: [
    {
      category: 'category 1',
      completedCount: 1,
      description: 'Task 1',
      id: '2T4alykTIxa93q0qkHFr',
      pomodoroCount: 2,
    },
    {
      category: 'category 1',
      completedCount: 3,
      description: 'Task 2',
      id: 'BccdSf2MllBd36LGEv2D',
      pomodoroCount: 5,
    },
    {
      category: 'category 2',
      completedCount: 2,
      description: 'Task 3',
      id: 'sdsadsat33dq3',
      pomodoroCount: 0,
    },
  ],
};

const wrapper: FC = ({ children }) => (
  <AppProvider initialState={mockedState}>{children}</AppProvider>
);

describe('useTasks', () => {
  it('returns correct computed pomodoros', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.todoPomodorosCount).toBe(7);
    expect(result.current.completedPomodorosCount).toBe(6);
  });

  it('returns correct computed todoTasks', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.todoTasks).toEqual([
      {
        category: 'category 1',
        completedCount: 1,
        description: 'Task 1',
        id: '2T4alykTIxa93q0qkHFr',
        pomodoroCount: 2,
      },
      {
        category: 'category 1',
        completedCount: 3,
        description: 'Task 2',
        id: 'BccdSf2MllBd36LGEv2D',
        pomodoroCount: 5,
      },
    ]);
  });

  it('returns correct computed doneTasks', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.doneTasks).toEqual([
      {
        category: 'category 1',
        completedCount: 1,
        description: 'Task 1',
        id: '2T4alykTIxa93q0qkHFr',
        pomodoroCount: 2,
      },
      {
        category: 'category 1',
        completedCount: 3,
        description: 'Task 2',
        id: 'BccdSf2MllBd36LGEv2D',
        pomodoroCount: 5,
      },
      {
        category: 'category 2',
        completedCount: 2,
        description: 'Task 3',
        id: 'sdsadsat33dq3',
        pomodoroCount: 0,
      },
    ]);
  });
});
