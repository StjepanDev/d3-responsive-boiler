import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useObserverHook(ref) {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const targetDiv = ref.current;
    const resizeObserver = new ResizeObserver((coordinates) => {
      coordinates.forEach((cords) => setDimensions(cords.contentRect));
    });
    resizeObserver.observe(targetDiv);
    return () => {
      //cleanup fn - 2 not recreate same fn
      resizeObserver.unobserve(targetDiv);
    };
  }, [ref]);

  return dimensions;
}

export default useObserverHook;
