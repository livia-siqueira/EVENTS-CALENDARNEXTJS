import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  showNotification: function (notification) {},
  hideNotification: function () {},
});

export function NotificationProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState();
  

  useEffect(() => {
      if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
        const timer = setTimeout(() => {
            setActiveNotification(null)
        }, 3000)
        return () => {
            clearTimeout(timer);
        }
      }
  }, [activeNotification])
  function showNotification(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };
  return (
    <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>
  );
}
