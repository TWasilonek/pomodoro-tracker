import { act, renderHook } from '@testing-library/react-hooks';
import { useCountdown } from './useCountdown';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('starts counter in stale mode', () => {
    const { result } = renderHook(() => useCountdown(60000));

    expect(result.current.isCountdownRunning).toBe(false);
    expect(result.current.counter).toBe(60000);
  });

  it('startCountdown starts the countdown', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useCountdown(60000));

    act(() => {
      result.current.startCountdown();
    });
    expect(result.current.isCountdownRunning).toBe(true);

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(59000);

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(58000);
  });

  it('pauseCountdown stop the countdown', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useCountdown(60000));

    act(() => {
      result.current.startCountdown();
    });

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(59000);
    expect(result.current.isCountdownRunning).toBe(true);

    act(() => {
      result.current.pauseCountdown();
    });

    expect(result.current.isCountdownRunning).toBe(false);
    expect(result.current.counter).toBe(59000);

    jest.advanceTimersByTime(2000);
    expect(result.current.counter).toBe(59000);
  });

  it('startCountdown after it was stopped resumes the countdown', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useCountdown(60000));

    act(() => {
      result.current.startCountdown();
    });

    jest.advanceTimersByTime(1000);

    act(() => {
      result.current.pauseCountdown();
    });

    jest.advanceTimersByTime(2000);

    act(() => {
      result.current.startCountdown();
    });

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(58000);
  });

  it.skip('resetTime stops countdonw and set counter to new time', () => {
    // TODO:
  });
});
