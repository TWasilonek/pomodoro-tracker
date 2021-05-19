import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../../store/Tasks.reducers';
import { formatDateToHoursAndMinutes } from '../../../utils/timeUtils';
import Button from '../../../UI/Button';
import TaskMenu from '../TaskMenu';

interface StyledProps {
  flex?: number;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Element = styled.p`
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
  width: 48px;
  height: 48px;
  border-radius: 100%;
  cursor: pointer;
`;

interface Props {
  task: Task;
  pomodoroTimeInMilliseconds: number;
  numberOfPrecedingPomodors?: number;
}

const TaskElement: React.FC<Props> = ({
  task,
  pomodoroTimeInMilliseconds,
  numberOfPrecedingPomodors = 0,
}) => {
  const { dispatch } = useContext(AppContext);
  const [endTime, setEndTIme] = useState(new Date());

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

  const handleAddPomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.ADD_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  return (
    <Wrapper>
      <Element flex={3}>{task.category || ''}</Element>
      <Element flex={7}>{task.description}</Element>
      <Element flex={2}>
        <p>{formatDateToHoursAndMinutes(endTime)}</p>
        <PomodorsButton type="button" onClick={handleAddPomodoroClick}>
          {task.pomodoroCount}
        </PomodorsButton>
        <TaskMenu task={task} />
      </Element>
    </Wrapper>
  );
};

export default TaskElement;
