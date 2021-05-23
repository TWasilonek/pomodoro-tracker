import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import format from 'date-fns/format';

import {AppContext} from '../../../store/AppContext';
import {Task, TASK_ACTIONS, TASK_MODES} from '../../../store/Tasks.reducers';
import Button from '../../../UI/Button';
import TaskMenu from '../TaskMenu';
import EditTaskForm from '../EditTaskModal';
import {COLORS} from '../../../constants/colors';

interface StyledProps {
  flex?: number;
}

const Wrapper = styled.View`
  margin-top: 10px;
`;

const TaskWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Element = styled.View`
  display: flex;
  align-items: center;
  flex: ${(props: StyledProps) => props.flex};
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 21px;
`;

const PomodorsButton = styled(Button)`
  margin-right: 7px;
  width: 48px;
  height: 48px;
  border-radius: 200;
`;

const Time = styled.Text`
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
  const {dispatch} = useContext(AppContext);
  const [endTime, setEndTIme] = useState('');
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const precedingTime =
      numberOfPrecedingPomodors * pomodoroTimeInMilliseconds;
    const endingTimeFromNow = new Date(
      Date.now() +
        precedingTime +
        task.pomodoroCount * pomodoroTimeInMilliseconds,
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
    ({category, description}) => {
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
    [dispatch, task],
  );

  const handleAddPomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.ADD_POMODORO,
      payload: {id: task.id},
    });
  }, [dispatch, task.id]);

  const handleDeletePomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.DELETE_POMODORO,
      payload: {id: task.id},
    });
  }, [dispatch, task.id]);

  const handleDeleteTaskClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.DELETE_TASK,
      payload: {id: task.id},
    });
  }, [dispatch, task.id]);

  const handleSetCompletedClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.COMPLETE_POMODORO,
      payload: {id: task.id},
    });
  }, [dispatch, task.id]);

  return (
    <Wrapper>
      {/* {isEdited ? (
        <EditTaskForm
          data={{
            category: task.category || '',
            description: task.description,
            id: task.id,
          }}
          onSubmit={handleSubmitEditedTask}
        />
      ) : ( */}
      <TaskWrapper>
        <Element flex={3}>
          <Text>{task.category || ''}</Text>
        </Element>
        <Element flex={7}>
          <Text>{task.description}</Text>
        </Element>
        <Element flex={2}>
          {mode === TASK_MODES.COMPLETED ? (
            <PomodorsButton disabled>
              <Text>{task.completedCount}</Text>
            </PomodorsButton>
          ) : (
            <>
              <Time>{endTime}</Time>
              <PomodorsButton onPress={handleAddPomodoroClick}>
                <Text>{task.pomodoroCount}</Text>
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
      {/* )} */}
    </Wrapper>
  );
};

export default TaskElement;
