import { useEffect, useState } from "react";
import { formatDateToHoursAndMinutes } from "../../utils/timeUtils";

interface Props {
  category?: string;
  description: string;
  numberOfPomodoros: number;
  pomodoroTimeInMilliseconds: number;
  numberOfPrecedingPomodors?: number; 
}

const Task: React.FC<Props> = ({ category, description, numberOfPomodoros, pomodoroTimeInMilliseconds, numberOfPrecedingPomodors = 0 }) => {
  const [endTime, setEndTIme] = useState(new Date());
  useEffect(() => {
    // TODO: calculate end time from remaining pomodoros * pomodoroTime
    const precedingTime = numberOfPrecedingPomodors * pomodoroTimeInMilliseconds;
    const endingTimeFromNow = new Date(Date.now() + precedingTime + numberOfPomodoros * pomodoroTimeInMilliseconds);
    setEndTIme(endingTimeFromNow);
  }, [numberOfPomodoros, pomodoroTimeInMilliseconds, numberOfPrecedingPomodors]);

  return (
    <>
      <p>{category || ""}</p>
      <p>{description}</p>
      <div>
        <p>{formatDateToHoursAndMinutes(endTime)}</p>
        <button>{numberOfPomodoros}</button>
        <div>
          <button>...</button>
          <div>
            <ul>
              <li>
                <button>+ Add another pomodoro</button>
              </li>
              <li>
                <button>- Delete one pomodoro</button>
              </li>
              <li>
                <button>V Set as completed</button>
              </li>
              <li>
                <button>Edit</button>
              </li>
              <li>
                <button>Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
