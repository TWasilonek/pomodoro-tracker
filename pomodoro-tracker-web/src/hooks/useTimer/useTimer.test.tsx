import { act, renderHook } from '@testing-library/react-hooks';
import useTimer from './useTimer';

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
    const { result } = renderHook(() => useTimer(60000));

    expect(result.current.isRunning).toBe(false);
    expect(result.current.counter).toBe(60000);
  });

  it('startTimer starts the countdown', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useTimer(60000));

    act(() => {
      result.current.startTimer();
    });
    expect(result.current.isRunning).toBe(true);

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(59000);

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(58000);
  });

  it('pauseTimer stop the countdown', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useTimer(60000));

    act(() => {
      result.current.startTimer();
    });

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(59000);
    expect(result.current.isRunning).toBe(true);

    act(() => {
      result.current.pauseTimer();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.counter).toBe(59000);

    jest.advanceTimersByTime(2000);
    expect(result.current.counter).toBe(59000);
  });

  it('startTimer after it was stopped resumes the countdown', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useTimer(60000));

    act(() => {
      result.current.startTimer();
    });

    jest.advanceTimersByTime(1000);

    act(() => {
      result.current.pauseTimer();
    });

    jest.advanceTimersByTime(2000);

    act(() => {
      result.current.startTimer();
    });

    jest.advanceTimersByTime(1000);
    expect(result.current.counter).toBe(58000);
  });
});
