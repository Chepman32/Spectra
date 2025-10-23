/**
 * Toast Context - Global toast management
 */

import React, {createContext, useContext, useState, useCallback} from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top' | 'bottom';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  action?: ToastAction;
  icon?: string;
}

interface ToastContextValue {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
  const [toast, setToast] = useState<(ToastConfig & {visible: boolean}) | null>(
    null,
  );
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    setToast(prev => (prev ? {...prev, visible: false} : null));
    setTimeout(() => setToast(null), 300); // Wait for exit animation
  }, []);

  const showToast = useCallback(
    (config: ToastConfig) => {
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Show new toast
      setToast({...config, visible: true});

      // Auto-hide after duration
      const duration = config.duration ?? 3000;
      const newTimeoutId = setTimeout(hideToast, duration);
      setTimeoutId(newTimeoutId);
    },
    [hideToast, timeoutId],
  );

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      {toast && <ToastContainer {...toast} onDismiss={hideToast} />}
    </ToastContext.Provider>
  );
};

// Toast Container Component (will be implemented next)
import ToastContainer from './ToastContainer';
