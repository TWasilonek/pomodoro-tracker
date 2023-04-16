import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import {
  Task,
  TASK_ACTIONS,
  TASK_MODES,
} from '../../../store/tasks/Tasks.reducers';
import Button from '../../../UI/Button';
import TaskMenu from '../TaskMenu';
import EditTaskForm from '../EditTaskForm';
import { COLORS } from '../../../constants/colors';
import { useAppContext } from '../../../store/AppContext';
import useTasksActions from '../../../services/firebase/hooks/useTasksActions';

interface StyledProps {
  flex?: number;
}

const Wrapper = styled.div`
  margin-top: 10px;
`;

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Element = styled.div`
  display: flex;
  align-items: center;
  flex: ${(props: StyledProps) => props.flex};
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 21px;

  &:not(:last-child) {
    margin-right: 30px;
  }

  @media (max-width: 500px) {
    width: 100%;

    &:not(:last-child) {
      margin-right: 0;
    }
  }
`;

const TextElement = styled(Element)`
  word-break: break-word;
  text-align: start;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ElemTitle = styled.h4`
  margin: 0 10px 3px 0;
  color: ${COLORS.TEXT_LIGHT};
  word-break: initial;
  font-size: 12px;

  @media (min-width: 501px) {
    display: none;
  }
`;

const PomodorsButton = styled(Button)`
  margin-right: 7px;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  cursor: pointer;
`;

const Time = styled.p`
  margin-right: 7px;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.TEXT_LIGHT};

  @media (max-width: 500px) {
    margin-right: auto;
    text-align: left;
  }
`;

const PomodorosDone = styled.p`
  font-size: 14px;
  color: ${COLORS.TEXT};
  margin: 0;
`;

interface Props {
  task: Task;
  mode: TASK_MODES;
  pomodoroTimeInMilliseconds: number;
  numberOfPrecedingPomodors?: number;
}

const TaskElement: React.FC<Props> = ({
  task,
  mode,
  pomodoroTimeInMilliseconds,
  numberOfPrecedingPomodors = 0,
}) => {
  const { dispatch, state } = useAppContext();
  const { updateTask: firebaseUpdateTask, deleteTask: firebaseDeleteTask } =
    useTasksActions();
  const [endTime, setEndTIme] = useState('');
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const precedingTime =
      numberOfPrecedingPomodors * pomodoroTimeInMilliseconds;
    const endingTimeFromNow = new Date(
      Date.now() +
        precedingTime +
        task.pomodoroCount * pomodoroTimeInMilliseconds
    );
    setEndTIme(format(endingTimeFromNow, 'kk:mm'));
  }, [
    task.pomodoroCount,
    pomodoroTimeInMilliseconds,
    numberOfPrecedingPomodors,
  ]);

  const handleEditTaskClick = useCallback(() => {
    setIsEdited(!isEdited);
  }, [isEdited]);

  const handleSubmitEditedTask = useCallback(
    async ({ category, description }) => {
      const newTask = {
        ...task,
        category,
        description,
      };

      if (state.auth.loggedIn) {
        await firebaseUpdateTask(newTask);
      } else {
        dispatch({
          type: TASK_ACTIONS.UPDATE_TASK,
          payload: newTask,
        });
      }

      setIsEdited(false);
    },
    [dispatch, state.auth.loggedIn, task, firebaseUpdateTask]
  );

  const handleAddPomodoroClick = useCallback(() => {
    if (state.auth.loggedIn) {
      firebaseUpdateTask({
        ...task,
        pomodoroCount: task.pomodoroCount + 1,
      });
    } else {
      dispatch({
        type: TASK_ACTIONS.ADD_POMODORO,
        payload: { id: task.id },
      });
    }
  }, [dispatch, state.auth.loggedIn, task, firebaseUpdateTask]);

  const handleDeletePomodoroClick = useCallback(() => {
    if (state.auth.loggedIn) {
      firebaseUpdateTask({
        ...task,
        pomodoroCount: task.pomodoroCount - 1,
      });
    } else {
      dispatch({
        type: TASK_ACTIONS.DELETE_POMODORO,
        payload: { id: task.id },
      });
    }
  }, [dispatch, state.auth.loggedIn, task, firebaseUpdateTask]);

  const handleDeleteTaskClick = useCallback(() => {
    if (state.auth.loggedIn) {
      firebaseDeleteTask(task);
    } else {
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK,
        payload: { id: task.id },
      });
    }
  }, [firebaseDeleteTask, dispatch, state.auth.loggedIn, task]);

  const handleSetCompletedClick = useCallback(() => {
    if (state.auth.loggedIn) {
      firebaseUpdateTask({
        ...task,
        completedCount: task.completedCount + 1,
        pomodoroCount: task.pomodoroCount - 1,
      });
    } else {
      dispatch({
        type: TASK_ACTIONS.COMPLETE_POMODORO,
        payload: { id: task.id },
      });
    }
  }, [dispatch, state.auth.loggedIn, task, firebaseUpdateTask]);

  return (
    <Wrapper>
      {isEdited ? (
        <EditTaskForm
          data-test
          data={{
            category: task.category || '',
            description: task.description,
            id: task.id,
          }}
          onSubmit={handleSubmitEditedTask}
        />
      ) : (
        <TaskWrapper>
          <TextElement flex={3}>
            {task.category && <ElemTitle>Category: </ElemTitle>}
            {task.category || ''}
          </TextElement>
          <TextElement flex={7}>
            <ElemTitle>Task: </ElemTitle>
            {task.description}
          </TextElement>
          <Element flex={2}>
            {mode === TASK_MODES.COMPLETED ? (
              <PomodorosDone>
                Pomodoros done: {task.completedCount}
              </PomodorosDone>
            ) : (
              <>
                <Time>
                  <ElemTitle>Will finish at: </ElemTitle>
                  {endTime}
                </Time>
                <PomodorsButton type="button" onClick={handleAddPomodoroClick}>
                  {task.pomodoroCount}
                </PomodorsButton>
                <TaskMenu
                  onEditTaskClick={handleEditTaskClick}
                  onDeleteTaskClick={handleDeleteTaskClick}
                  onAddPomodoroClick={handleAddPomodoroClick}
                  onCompletePomodoroClick={handleSetCompletedClick}
                  onDeletePomodoroClick={handleDeletePomodoroClick}
                />
              </>
            )}
          </Element>
        </TaskWrapper>
      )}
    </Wrapper>
  );
};

export default TaskElement;
