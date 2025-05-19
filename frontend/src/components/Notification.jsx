import { useAppContext } from "../contexts/AppContext";

const Notification = () => {
  const { notification } = useAppContext();

  if (!notification) return null;

  const bgColor = notification.type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-md shadow-lg flex items-center justify-between`}
      >
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;
