import React, {useCallback, useContext, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import styled from 'styled-components/native';
import {SectionListData} from 'react-native';

import {AppContext} from '../../store/AppContext';
import Heading from '../Heading';
import {Task, TASK_ACTIONS, TASK_MODES} from '../../store/Tasks.reducers';
import {DEFAULT_TASK_TIME} from '../../constants/defaults';
import {COLORS} from '../../constants/colors';
import EditTaskModal from './EditTaskModal';
import {getMillisFromMinutes} from '../../utils/timeUtils';
import TaskElement from './TaskElement/TaskElement';
import {EditTaskFormValues} from './EditTaskModal/EditTaskModal';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 20;
  padding-left: 15;
  padding-right: 15;
`;

const List = styled.SectionList`
  margin-top: 20;
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
  const [tasksData, setTasksData] = useState<TaskSection[]>();
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState<EditTaskFormValues>({
    category: '',
    description: '',
  });

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
        data: todo,
        header: {
          text: 'Tasks',
          numberOfPomodoros: todoPomodorosCount,
          pomodoroTime: DEFAULT_TASK_TIME,
        },
      },
      {
        data: done,
        header: {
          text: 'Done',
          numberOfPomodoros: completedPomodorosCount,
          pomodoroTime: DEFAULT_TASK_TIME,
        },
      },
    ]);
  }, [completedPomodorosCount, state.tasks, todoPomodorosCount]);

  const addNewTask = useCallback(
    (data: EditTaskFormValues) => {
      const newTask: Task = {
        id: uuidv4(),
        category: data.category,
        description: data.description,
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

  const updateTask = useCallback(
    (data: EditTaskFormValues) => {
      const updatedTask = state.tasks.find(task => task.id === data.id);
      if (updatedTask) {
        dispatch({
          type: TASK_ACTIONS.UPDATE_TASK,
          payload: {
            ...updatedTask,
            ...data,
          },
        });
      }
    },
    [dispatch, state.tasks],
  );

  const handleSaveTask = useCallback(
    (data: EditTaskFormValues) => {
      if (data.id) {
        updateTask(data);
      } else {
        addNewTask(data);
      }

      setEditTaskModalVisible(false);
    },
    [addNewTask, updateTask],
  );

  const handleEditTaskClick = useCallback((data: Task) => {
    console.log('data', data);
    setEditedTask({
      id: data.id,
      category: data.category || '',
      description: data.description,
    });

    setEditTaskModalVisible(true);
  }, []);

  const handleAddTaskClick = useCallback(() => {
    setEditTaskModalVisible(true);
    setEditedTask({category: '', description: ''});
  }, []);

  const renderSectionHeader = ({
    section: {header},
  }: {
    section: SectionListData<Task, TaskSection>;
  }) => (
    <Heading
      text={header.text}
      numberOfPomodoros={header.numberOfPomodoros}
      pomodoroTime={header.pomodoroTime}
    />
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

  console.log('edited task', editedTask);

  return (
    <Wrapper>
      <Button onPress={handleAddTaskClick}>
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
            onEditTaskClick={handleEditTaskClick}
          />
        )}
        keyExtractor={item => (item as Task).id}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
      <EditTaskModal
        onSubmit={handleSaveTask}
        data={editedTask}
        modalProps={{
          visible: editTaskModalVisible,
          onRequestClose: () => setEditTaskModalVisible(false),
        }}
      />
    </Wrapper>
  );
};

export default Tasks;
