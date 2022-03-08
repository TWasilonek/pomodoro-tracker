import { render, screen } from '@testing-library/react';
import { getMillisFromMinutes } from '../../utils/timeUtils';
import Timer from './Timer';
// the timer displays the minutes and seconds left for a task completion
// it switches between break and task states
// it displays the current task that is in progess
// the switches are done automatically
// it allows to start/pause/resume/complete

describe('Timer', () => {
  describe('When started without tasks', () => {
    beforeEach(() => {
      render(
        <Timer
          taskTime={getMillisFromMinutes(10)}
          breakTime={getMillisFromMinutes(1)}
          activeTask={null}
        />
      );
    });

    it('displays the default time needed for completing a pomodoro', () => {
      expect(screen.getByRole('timer')).toHaveTextContent('10:00');
    });

    it("doesn't display any task name", () => {
      expect(screen.getByTestId('task-name')).toHaveTextContent('');
    });

    it("shows 'Start' and 'Complete' buttons", () => {
      expect(screen.getByText('Start')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
    });
  });
});
