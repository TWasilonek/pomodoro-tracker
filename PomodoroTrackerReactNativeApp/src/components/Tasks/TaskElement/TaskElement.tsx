import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import styled from 'styled-components/native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/AntDesign';

import {AppContext} from '../../../store/AppContext';
import {Task, TASK_ACTIONS, TASK_MODES} from '../../../store/Tasks.reducers';
import Button from '../../../UI/Button';
import TaskMenu from '../TaskMenu';
import EditTaskForm from '../EditTaskModal';
import {COLORS} from '../../../constants/colors';

interface StyledProps {
  flex?: number;
}

// const Wrapper = styled.View`
//   margin-top: 10px;
// `;

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
  justify-content: space-between;
  align-items: center;
`;

const AddPomodoroWrapper = styled.View``;

const PomodorsButton = styled(Button)`
  margin-right: 7px;
  width: 48;
  height: 48;
  border-radius: 200;
`;

const AddPomodoroBtnText = styled.Text`
  color: ${COLORS.CYAN};
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
    <>
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
          {/* <Element flex={3}> */}

          {/* </Element> */}
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
          {mode === TASK_MODES.COMPLETED ? (
            <PomodorsButton disabled>
              <Text>{task.completedCount}</Text>
            </PomodorsButton>
          ) : (
            <>
              {/* <AddPomodoroWrapper style={{flex: 1, alignSelf: 'flex-start'}}> */}
              <PomodorsButton onPress={handleAddPomodoroClick}>
                <Text>{task.pomodoroCount}</Text>
              </PomodorsButton>
              <Pressable>
                <AddPomodoroBtnText>+ Add Pomodoro</AddPomodoroBtnText>
              </Pressable>
              {/* </AddPomodoroWrapper> */}

              <Time>{endTime}</Time>
            </>
          )}
        </Bottom>
        {/* <Element flex={2}>
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
        </Element> */}
        {/* <Element flex={7}>
          <Text>{task.description}</Text>
        </Element> */}
      </TaskWrapper>
      {/* )} */}
    </>
  );
};

export default TaskElement;
