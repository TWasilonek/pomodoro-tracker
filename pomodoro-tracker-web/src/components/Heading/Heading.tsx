import formatDuration from 'date-fns/formatDuration';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const Wrapper = styled.h2`
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

const Title = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.TEXT};

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const Time = styled.span`
  margin-left: 7px;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.TEXT_LIGHT};

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

interface Props {
  text: string;
  numberOfPomodoros: number;
  pomodoroTime: number;
}

const Heading: React.FC<Props> = ({
  text,
  numberOfPomodoros,
  pomodoroTime,
}) => {
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
          ? `/ ${formatDuration({ hours, minutes: reminderMinutes })}`
          : ''}
      </Time>
    </Wrapper>
  );
};

export default Heading;
