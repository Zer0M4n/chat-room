"use client";
import { useEffect, useRef, useState } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  const user = useRef(null);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      if (!user.current) return;
      setChat((prev) => [...prev, { content: data.msg, user: { name: data.user } }]);
      console.log(data);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    socket.on("new_user", (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server", user: { name: "System" } },
      ]);
    });

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  }, [typing]);

  return (
    <main className="h-screen max-h-screeen max-w-screen mx-auto md:container md:p-20 md:pt-4
     bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      
        {user.current ? (
          <>
            <Chat chat={chat} user={user} typing={typing} />
            <Inputs setChat={setChat} user={user} socket={socket} room={room} />
          </>
        ) : (
          <SignUp
            user={user}
            socket={socket}
            setUser={setUsername}
            setRoom={setRoom}
          />
        )}
      
    </main>
  );
}