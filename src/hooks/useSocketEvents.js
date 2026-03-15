import { useEffect } from "react";
import { getSocket } from "../utils/socket";

export default function useSocketEvents({
  onUserList,
  onCursor,
  onText,
  onClear
}) {

  useEffect(() => {

    const socket = getSocket();

    if (!socket) return;

    const handleMessage = (event) => {

      const message = JSON.parse(event.data);

      if (message.type === "user_list" && onUserList) {
        onUserList(message.users);
      }

      if (message.type === "cursor" && onCursor) {
        onCursor(message);
      }

      if (message.type === "text" && onText) {
        onText(message.data);
      }

      if (message.type === "clear" && onClear) {
        onClear();
      }

    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };

  }, [onUserList, onCursor, onText, onClear]);

}