// src/hooks/usePortalContainer.js
import { useState, useEffect } from 'react';

export function usePortalContainer() {
  const [container, setContainer] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.getElementById('app-overlay-root') || document.body;
    }
    return null;
  });

  useEffect(() => {
    const el = document.getElementById('app-overlay-root');
    if (el) {
      setContainer(el);
    }
  }, []);

  return container;
}
