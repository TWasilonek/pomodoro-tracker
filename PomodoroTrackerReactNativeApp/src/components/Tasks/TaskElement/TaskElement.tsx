import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, Pressable} from 'react-native';
import styled from 'styled-components/native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/AntDesign';

import {AppContext} from '../../../store/AppContext';
import {Task, TASK_ACTIONS, TASK_MODES} from '../../../store/Tasks.reducers';
import TaskMenu from '../TaskMenu';
import {COLORS} from '../../../constants/colors';

const TaskWrapper = styled.View`
  margin-top: 22px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${COLORS.DARK_BLUE_GREYISH};
  padding: 10px;
`;

const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const Category = styled.View`
  flex-direction: row;
`;

const CategoryText = styled.Text`
  margin-left: 6px;
  font-weight: 600;
  font-size: 19px;
  color: ${COLORS.TEXT_LIGHT};
`;

const TaskText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${COLORS.TEXT};
  margin-bottom: 18px;
`;

const Bottom = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PomodorosCount = styled.View`
  margin-right: 7px;
  width: 48;
  height: 48;
  border-radius: 200;
  border-width: 1;
  border-color: ${COLORS.GREY_LIGHTER};
  align-items: center;
  justify-content: center;
  font-size: 21px;
  color: ${COLORS.TEXT};
`;

const AddPomodoroBtnText = styled.Text`
  color: ${COLORS.CYAN};
`;

const Time = styled.Text`
  margin-right: 7px;
  font-size: 20px;
  font-weight: 700;
  text-align: right;
  color: ${COLORS.TEXT_LIGHT};
  flex: 1;
`;

interface Props {
  task: Task;
  mode: TASK_MODES;
  pomodoroTimeInMilliseconds: number;
  numberOfPrecedingPomodors?: number;
  // onAddPomodoroClick?: (task: Task) => void;
  onEditTaskClick?: (task: Task) => void;
}

const TaskElement: React.FC<Props> = ({
  task,
  mode,
  pomodoroTimeInMilliseconds,
  onEditTaskClick,
  numberOfPrecedingPomodors = 0,
}) => {
  const {dispatch} = useContext(AppContext);
  const [endTime, setEndTIme] = useState('');

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
    onEditTaskClick && onEditTaskClick(task);
  }, [onEditTaskClick, task]);

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
    <>
      <TaskWrapper>
        <Top>
          <Category>
            <Icon
              name="tag"
              size={24}
              color={COLORS.GREEN}
              style={{transform: [{rotateY: '180deg'}]}}
            />
            <CategoryText>{task.category || ''}</CategoryText>
          </Category>
          {mode !== TASK_MODES.COMPLETED && (
            <TaskMenu
              onEditTaskClick={handleEditTaskClick}
              onDeleteTaskClick={handleDeleteTaskClick}
              onAddPomodoroClick={handleAddPomodoroClick}
              onCompletePomodoroClick={handleSetCompletedClick}
              onDeletePomodoroClick={handleDeletePomodoroClick}
            />
          )}
        </Top>
        <TaskText>{task.description}</TaskText>
        <Bottom>
          <PomodorosCount>
            <Text>{task.pomodoroCount}</Text>
          </PomodorosCount>
          {mode === TASK_MODES.TODO && (
            <Pressable onPress={() => handleAddPomodoroClick}>
              <AddPomodoroBtnText>+ Add Pomodoro</AddPomodoroBtnText>
            </Pressable>
          )}
          <Time>{endTime}</Time>
        </Bottom>
      </TaskWrapper>
    </>
  );
};

export default TaskElement;
