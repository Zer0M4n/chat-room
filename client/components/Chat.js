import { useEffect, useRef } from "react";
import { Message, ServerMessage, Typing } from "./Messages";

const Chat = ({ chat, user, typing, type }) => {
  const scroller = useRef(null);

  useEffect(() => {
    if (!scroller.current) return;

    scroller.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [chat]);

  return (
    <div className="h-full pb-12 md:p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full h-full max-h-screen rounded-md overflow-y-auto pt-2 md:pt-6 shadow-lg bg-white dark:bg-gray-800">
        {chat.map((message, index) => {
          message = { ...message, own: message.user.name === user.current };
          return message.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} content={message.content} type={message.type} own={message.own} user={message.user} />
          );
        })}
        {typing[0] && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2 md:pb-6" />
      </div>
    </div>
  );
};

export default Chat;
