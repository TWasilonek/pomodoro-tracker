import { RefObject, useEffect } from 'react';

function useOnOutsideClick(
  ref: RefObject<HTMLElement>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        ref.current &&
        event.target instanceof HTMLElement &&
        !ref.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick, ref]);
}

export default useOnOutsideClick;
