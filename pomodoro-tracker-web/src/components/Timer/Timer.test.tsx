import { render, screen } from '@testing-library/react';
import { getMillisFromMinutes } from '../../utils/timeUtils';
import Timer from './Timer';

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

    it("doesn't display any task description", () => {
      expect(screen.getByTestId('task-description')).toHaveTextContent('');
    });

    it("shows 'Start' and 'Complete' buttons", () => {
      expect(screen.getByText('Start')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
    });
  });

  describe('When started with an active task', () => {
    it("displays the taks's description", () => {
      render(
        <Timer
          taskTime={getMillisFromMinutes(10)}
          breakTime={getMillisFromMinutes(1)}
          activeTask={{
            id: '1',
            description: 'This is a task',
            pomodoroCount: 1,
            completedCount: 0,
          }}
        />
      );

      expect(screen.getByTestId('task-description')).toHaveTextContent(
        'This is a task'
      );
    });
  });

  describe('Timer actions', () => {
    // TODO:
    // it allows to start/pause/resume/complete
    // it switches between break and task states
    // it displays the current task that is in progess
    // the switches are done automatically
  });
});
