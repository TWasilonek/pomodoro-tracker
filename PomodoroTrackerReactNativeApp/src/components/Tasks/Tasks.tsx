import React, {useCallback, useContext, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import styled from 'styled-components/native';

import {AppContext} from '../../store/AppContext';
import Heading from '../Heading';
import TasksList from './TasksList';
import {Task, TASK_ACTIONS, TASK_MODES} from '../../store/Tasks.reducers';
import {DEFAULT_TASK_TIME} from '../../constants/defaults';
import {COLORS} from '../../constants/colors';
import EditTaskModal from './EditTaskModal';
import {FlatList, ScrollView, View, ListRenderItem} from 'react-native';

import {getMillisFromMinutes} from '../../utils/timeUtils';
import TaskElement from './TaskElement/TaskElement';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 20;
  padding-left: 15;
  padding-right: 15;
`;

const List = styled.SectionList`
  flex: 1;
`;

const Button = styled.Pressable`
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.TOMATO};
  border-radius: 29px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  font-size: 21px;
  color: #fff;
`;

interface TaskSection {
  data: Task[];
  header: {
    text: string;
    numberOfPomodoros: number;
    pomodoroTime: number;
  };
}

const Tasks = () => {
  const {state, dispatch} = useContext(AppContext);
  const [todoPomodorosCount, setTodoPomodorosCount] = useState(0);
  const [completedPomodorosCount, setCompletedPomodorosCount] = useState(0);
  // const [todoTasks, setTodoTasks] = useState<TaskSection>();
  const [tasksData, setTasksData] = useState<TaskSection[]>();
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

    setTasksData([
      {
        data: done,
        header: {
          text: 'Pomodoros',
          numberOfPomodoros: todoPomodorosCount,
          pomodoroTime: DEFAULT_TASK_TIME,
        },
      },
      {
        data: todo,
        header: {
          text: 'Done',
          numberOfPomodoros: completedPomodorosCount,
          pomodoroTime: DEFAULT_TASK_TIME,
        },
      },
    ]);
  }, [completedPomodorosCount, state.tasks, todoPomodorosCount]);

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
      setEditTaskModalVisible(false);
    },
    [dispatch],
  );

  const getNumberOfPreceedingPomodoros = useCallback(
    (tasks: Task[], task: Task) => {
      let count = 0;

      for (let i = 0; i < tasks.length; i++) {
        const current = tasks[i];
        if (current.id === task.id) {
          break;
        }
        count += current.pomodoroCount;
      }

      return count;
    },
    [],
  );

  return (
    <Wrapper>
      {/* <View> */}
      {/* <Wrapper> */}
      <Button onPress={() => setEditTaskModalVisible(true)}>
        <ButtonText>Add Task</ButtonText>
      </Button>
      <List
        sections={tasksData || []}
        renderItem={({item, section}) => (
          <TaskElement
            mode={TASK_MODES.TODO}
            task={item as Task}
            numberOfPrecedingPomodors={getNumberOfPreceedingPomodoros(
              section.data as Task[],
              item as Task,
            )}
            pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
          />
        )}
        keyExtractor={item => (item as Task).id}
        ListHeaderComponent={
          <Heading
            text="Pomodoros"
            numberOfPomodoros={todoPomodorosCount}
            pomodoroTime={DEFAULT_TASK_TIME}
          />
        }
      />

      {/* <Heading
            text="Pomodoros"
            numberOfPomodoros={todoPomodorosCount}
            pomodoroTime={DEFAULT_TASK_TIME}
          /> */}
      {/* {todoTasks.length > 0 && (
            <TasksList tasks={todoTasks} mode={TASK_MODES.TODO} />
          )} */}
      {/* <Heading
        text="Done"
        numberOfPomodoros={completedPomodorosCount}
        pomodoroTime={DEFAULT_TASK_TIME}
      />
      {tasksData.length > 0 && (
        <TasksList tasks={tasksData} mode={TASK_MODES.COMPLETED} />
      )} */}
      {/* </Wrapper> */}
      {/* </View> */}
      <EditTaskModal
        onSubmit={handleAddTask}
        data={{category: '', description: ''}}
        modalProps={{
          visible: editTaskModalVisible,
          onRequestClose: () => setEditTaskModalVisible(false),
        }}
      />
    </Wrapper>
  );
};

export default Tasks;
