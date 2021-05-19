import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { formatMillisToHoursAndMins } from '../../utils/timeUtils';

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
`;

const Time = styled.span`
  margin-left: 7px;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.TEXT_LIGHT};
`;

interface Props {
  text: string;
  numberOfPomodoros: number;
  pomodoroTimeInMilliseconds: number;
}

const Heading: React.FC<Props> = ({
  text,
  numberOfPomodoros,
  pomodoroTimeInMilliseconds: pomodoroTime,
}) => (
  <Wrapper>
    <Title>
      {text} : {numberOfPomodoros}
    </Title>
    <Time>
      / {formatMillisToHoursAndMins(numberOfPomodoros * pomodoroTime)}
    </Time>
  </Wrapper>
);

export default Heading;
