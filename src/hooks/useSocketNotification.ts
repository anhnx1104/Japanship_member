import SocketNotificationContext from 'contexts/SocketNotification';
import { useContext } from 'react';

const useSocketNotification = () => {
  const context = useContext(SocketNotificationContext);

  if (!context) {
    throw new Error('Forgot to wrap component in ThemeProvider');
  }

  return context;
};

export default useSocketNotification;
