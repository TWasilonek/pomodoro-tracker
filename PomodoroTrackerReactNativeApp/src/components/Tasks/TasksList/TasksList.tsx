import React, {FunctionComponent, useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import styled from 'styled-components/native';

import {getMillisFromMinutes} from '../../../utils/timeUtils';
import TaskElement from '../TaskElement/TaskElement';
import {Task, TASK_MODES} from '../../../store/Tasks.reducers';

const List = styled.FlatList``;

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

  const renderItem: ListRenderItem<Task> = ({item}) => (
    <TaskElement
      mode={mode}
      task={item}
      numberOfPrecedingPomodors={getNumberOfPreceedingPomodoros(item)}
      pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
    />
  );

  return (
    // @ts-ignore
    <List data={tasks} renderItem={renderItem} keyExtractor={item => item.id} />
  );
};

export default TasksList;
