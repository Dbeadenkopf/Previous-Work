import {useContext, useEffect} from 'react';
import {UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom';

export function useBlocker(confirmExit: () => void, when = true) {
  const {navigator} = useContext(NavigationContext);

  useEffect(() => {
    if (!when) {
      return;
    }

    const push = navigator.push;

    navigator.push = (...args: Parameters<typeof push>) => {
      confirmExit();
      push(...args);
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when]);
}
