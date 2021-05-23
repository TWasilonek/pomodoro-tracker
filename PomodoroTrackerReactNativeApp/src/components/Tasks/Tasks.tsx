import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Pressable, PressableProps, Text} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import styled from 'styled-components/native';

import {AppContext} from '../../store/AppContext';
import Heading from '../Heading';
import TasksList from './TasksList';
import {Task, TASK_ACTIONS, TASK_MODES} from '../../store/Tasks.reducers';
import {DEFAULT_TASK_TIME} from '../../constants/defaults';
import {COLORS} from '../../constants/colors';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 20;
  padding-left: 15;
  padding-right: 15;
`;

const Button = styled.Pressable`
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.TOMATO};
  border-radius: 29px;
  padding: 20px;
`;

const ButtonText = styled.Text`
  font-size: 21px;
  color: #fff;
`;

const Tasks = () => {
  const {state, dispatch} = useContext(AppContext);
  const [todoPomodorosCount, setTodoPomodorosCount] = useState(0);
  const [completedPomodorosCount, setCompletedPomodorosCount] = useState(0);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);

  useEffect(() => {
    let todoCount = 0;
    let completedCount = 0;

    state.tasks.forEach((task: Task) => {
      completedCount += task.completedCount;
      todoCount += task.pomodoroCount;
    });

    setTodoPomodorosCount(todoCount);
    setCompletedPomodorosCount(completedCount);
  }, [state.tasks]);

  useEffect(() => {
    const done = state.tasks.filter(task => task.completedCount > 0);
    const todo = state.tasks.filter(task => task.pomodoroCount > 0);

    setDoneTasks(done);
    setTodoTasks(todo);
  }, [state.tasks]);

  const handleAddTask = useCallback(
    ({category, description}) => {
      const newTask: Task = {
        id: uuidv4(),
        category,
        description,
        pomodoroCount: 1,
        completedCount: 0,
      };

      dispatch({
        type: TASK_ACTIONS.ADD_TASK,
        payload: newTask,
      });
    },
    [dispatch],
  );

  return (
    <Wrapper>
      <Button onPress={() => setEditTaskModalVisible(true)}>
        <ButtonText>Add Task</ButtonText>
      </Button>
      {editTaskModalVisible && (
        <Text style={{fontSize: 55, color: '#ff0000'}}>ADD TASK MODAL!!!!</Text>
      )}
      <Heading
        text="Pomodoros"
        numberOfPomodoros={todoPomodorosCount}
        pomodoroTime={DEFAULT_TASK_TIME}
      />

      {/* <AddTaskForm
        onSubmit={handleAddTask}
        data={{category: '', description: ''}}
      /> */}
      {todoTasks.length > 0 && (
        <TasksList tasks={todoTasks} mode={TASK_MODES.TODO} />
      )}
      <Heading
        text="Done"
        numberOfPomodoros={completedPomodorosCount}
        pomodoroTime={DEFAULT_TASK_TIME}
      />
      {doneTasks.length > 0 && (
        <TasksList tasks={doneTasks} mode={TASK_MODES.COMPLETED} />
      )}
    </Wrapper>
  );
};

export default Tasks;
