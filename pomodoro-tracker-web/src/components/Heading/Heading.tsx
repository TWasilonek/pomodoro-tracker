import { formatMillisToHoursAndMins } from "../../utils/timeUtils";

interface Props {
  text: string;
  numberOfPomodoros: number;
  pomodoroTimeInMilliseconds: number;
}

const Heading: React.FC<Props> = ({ text, numberOfPomodoros, pomodoroTimeInMilliseconds: pomodoroTime }) => (
  <h2>
    {text} : {numberOfPomodoros} <span>/ {formatMillisToHoursAndMins(numberOfPomodoros * pomodoroTime)}</span>
  </h2>
);

export default Heading;
