import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../../store/AppContext';
import { Task, TASK_ACTIONS, TASK_MODES } from '../../../store/Tasks.reducers';
import { formatDateToHoursAndMinutes } from '../../../utils/timeUtils';
import Button from '../../../UI/Button';
import TaskMenu from '../TaskMenu';
import EditTaskForm from '../AddTaskForm';
import { COLORS } from '../../../constants/colors';

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
  const { dispatch } = useContext(AppContext);
  const [endTime, setEndTIme] = useState(new Date());
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const precedingTime =
      numberOfPrecedingPomodors * pomodoroTimeInMilliseconds;
    const endingTimeFromNow = new Date(
      Date.now() +
        precedingTime +
        task.pomodoroCount * pomodoroTimeInMilliseconds
    );
    setEndTIme(endingTimeFromNow);
  }, [
    task.pomodoroCount,
    pomodoroTimeInMilliseconds,
    numberOfPrecedingPomodors,
  ]);

  const handleEditTaskClick = useCallback(() => {
    setIsEdited(!isEdited);
  }, [isEdited]);

  const handleSubmitEditedTask = useCallback(
    ({ category, description }) => {
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK,
        payload: {
          ...task,
          category,
          description,
        },
      });
      setIsEdited(false);
    },
    [dispatch, task]
  );

  const handleAddPomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.ADD_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  const handleDeletePomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.DELETE_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  const handleDeleteTaskClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.DELETE_TASK,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  const handleSetCompletedClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.COMPLETE_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  return (
    <Wrapper>
      {isEdited ? (
        <EditTaskForm
          data={{
            category: task.category || '',
            description: task.description,
            id: task.id,
          }}
          onSubmit={handleSubmitEditedTask}
        />
      ) : (
        <TaskWrapper>
          <Element flex={3}>{task.category || ''}</Element>
          <Element flex={7}>{task.description}</Element>
          <Element flex={2}>
            {mode === TASK_MODES.COMPLETED ? (
              <PomodorsButton type="button" disabled>
                {task.completedCount}
              </PomodorsButton>
            ) : (
              <>
                <Time>{formatDateToHoursAndMinutes(endTime)}</Time>
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
