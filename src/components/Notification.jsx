import { useNotification } from "../context/NotificationContext";

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) return null;

  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`fixed top-20 right-4 ${getNotificationStyles(notification.type)} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`}>
      {notification.type === "info" && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )}
      {notification.message}
    </div>
  );
}
