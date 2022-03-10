import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getMillisFromMinutes } from '../../utils/timeUtils';
import Timer from './Timer';

// jest.spyOn(global, 'setInterval');

describe('Timer', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

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
    describe('Clicking the Start button', () => {
      beforeEach(() => {
        render(
          <Timer
            taskTime={getMillisFromMinutes(10)}
            breakTime={getMillisFromMinutes(1)}
            activeTask={{
              id: '1',
              description: 'First pomodoro',
              pomodoroCount: 1,
              completedCount: 0,
            }}
          />
        );

        userEvent.click(screen.getByText('Start'));
      });

      afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('shows the "Pause" and "Break" buttons', () => {
        expect(screen.getByText('Pause')).toBeInTheDocument();
        expect(screen.getByText('Stop')).toBeInTheDocument();
      });

      it("doesn't show the 'Start' and 'Complete' buttons", () => {
        expect(screen.queryByText('Start')).not.toBeInTheDocument();
        expect(screen.queryByText('Complete')).not.toBeInTheDocument();
      });

      it.skip('starts the timer countdown', async () => {
        expect(screen.getByRole('timer')).toHaveTextContent('10:00');
        jest.advanceTimersByTime(5000);

        await waitFor(() => {
          expect(screen.getByRole('timer')).toHaveTextContent('09:55');
          expect(setInterval).toHaveBeenCalledTimes(5);
        });
      });
    });
    // TODO:
    // it allows to start/pause/resume/complete
    // it switches between break and task states
    // it displays the current task that is in progess
    // the switches are done automatically
  });
});
