import MainHeader from "./main-header";
import Notification from "../ui/notification/notifications";
import { useContext } from "react";
import { NotificationContext } from "../../store";
const Layout = ({ children }) => {
  const cx = useContext(NotificationContext);
  const activeNotification = cx.notification;
  return (
    <>
      <MainHeader />
      <main>{children}</main>
     { activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />}
    </>
  );
};

export default Layout;
