import { useState } from "react";

const SignUp = ({ user, socket, setUser, setRoom }) => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const addUser = () => {
    if (username && roomName) {
      user.current = username;
      setUser(username);
      setRoom(roomName);
      socket.emit("join_room", { room: roomName, user: username });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center grid grid-rows-3 gap-2 p-8 rounded-md bg-slate-700">
        <h1 className="text-6xl font-bold text-white">Chat App</h1>
        <h2 className="text-2xl text-white">Enter your name and room to join</h2>
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-slate-950 placeholder-slate-500 focus:outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-slate-950 placeholder-slate-500 focus:outline-none"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button
          className={`text-xl w-full text-white font-bold py-2 px-3 rounded-md ${username && roomName ? "bg-gray-600" : "bg-slate-400"}`}
          disabled={!username || !roomName}
          onClick={addUser}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default SignUp;