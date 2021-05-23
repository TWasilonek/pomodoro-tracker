import React from 'react';
import formatDuration from 'date-fns/formatDuration';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/colors';

const Wrapper = styled.View`
  margin-top: 40px;
  display: flex;
  align-items: baseline;
  justify-content: center;

  &:before,
  &:after {
    content: '';
    flex: 1;
    align-self: center;
    background: ${COLORS.GREY_LIGHT};
    height: 1px;
  }
  &:before {
    margin-right: 15px;
  }
  &:after {
    margin-left: 15px;
  }
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
