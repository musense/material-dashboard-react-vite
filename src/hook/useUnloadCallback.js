import { useEffect } from "react";

export default function useUnloadCallback(callback) {
  useEffect(() => {
    window.addEventListener('unload', callback);
    return () => window.removeEventListener('unload', callback);
  }, [callback]);
}
