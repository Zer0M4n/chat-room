"use client";
import { useState, useEffect, useRef } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

export default function Home() {
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [TypeMsg, setTypeMsg] = useState("");

  const user = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: data.msg, user: { name: data.user }, type: data.type },
      ]);
      console.log(data.type);
    };

    const handleUserTyping = (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    };

    const handleNewUser = (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server", user: { name: "System" } },
      ]);
    };

    socket.on("recieve_message", handleReceiveMessage);
    socket.on("user_typing", handleUserTyping);
    socket.on("new_user", handleNewUser);

    return () => {
      socket.off("recieve_message", handleReceiveMessage);
      socket.off("user_typing", handleUserTyping);
      socket.off("new_user", handleNewUser);
    };
  }, [typing]);

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full h-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {user.current ? (
          <div className="flex flex-col h-full">
            <Chat chat={chat} user={user} typing={typing} type={TypeMsg} />
            <Inputs setChat={setChat} user={user} socket={socket} room={room} />
          </div>
        ) : (
          <SignUp user={user} socket={socket} setUser={setUsername} setRoom={setRoom} />
        )}
      </div>
    </main>
  );
}
