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
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center grid grid-rows-3 gap-4 p-6 rounded-lg shadow-lg bg-white max-w-sm w-full">
        <h1 className="text-3xl font-extrabold text-gray-800">Chat App</h1>
        <h2 className="text-lg text-gray-600">Enter your name and room to join</h2>
        <input
          type="text"
          className="text-lg text-center rounded-md p-3 my-2 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="text-lg text-center rounded-md p-3 my-2 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button
          className={`text-lg w-full text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 ${
            username && roomName ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
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