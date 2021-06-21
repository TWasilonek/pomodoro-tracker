import React from 'react';
import formatDuration from 'date-fns/formatDuration';
import styled from 'styled-components/native';

import {COLORS} from '../../constants/colors';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.TEXT};
`;

const Time = styled.Text`
  margin-left: 7px;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.TEXT_LIGHT};
`;

interface Props {
  text: string;
  numberOfPomodoros: number;
  pomodoroTime: number;
}

const Heading: React.FC<Props> = ({text, numberOfPomodoros, pomodoroTime}) => {
  const totalMinutes = numberOfPomodoros * pomodoroTime;
  const hours = Math.floor(totalMinutes / 60);
  const reminderMinutes = Math.floor(totalMinutes % 60);
  return (
    <Wrapper>
      <Title>
        {text} : {numberOfPomodoros}
      </Title>
      <Time>
        {numberOfPomodoros > 0
          ? `/ ${formatDuration({hours, minutes: reminderMinutes})}`
          : ''}
      </Time>
    </Wrapper>
  );
};

export default Heading;
