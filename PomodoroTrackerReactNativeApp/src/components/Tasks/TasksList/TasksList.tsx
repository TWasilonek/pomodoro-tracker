import React, {FunctionComponent, useCallback} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

import {getMillisFromMinutes} from '../../../utils/timeUtils';
import TaskElement from '../TaskElement/TaskElement';
import {Task, TASK_MODES} from '../../../store/Tasks.reducers';

const List = styled.View``;

interface Props {
  tasks: Task[];
  mode: TASK_MODES;
}

const TasksList: FunctionComponent<Props> = ({tasks, mode}) => {
  const getNumberOfPreceedingPomodoros = useCallback(
    (task: Task) => {
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
    [tasks],
  );

  return (
    <List>
      {tasks.map(task => (
        <View key={task.id}>
          <TaskElement
            mode={mode}
            task={task}
            numberOfPrecedingPomodors={getNumberOfPreceedingPomodoros(task)}
            pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
          />
        </View>
      ))}
    </List>
  );
};

export default TasksList;
