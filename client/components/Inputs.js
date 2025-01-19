import { useState } from "react";
import Image from "next/image";
import send from "@/assets/send.svg";
import upload from "@/assets/upload.svg";

const Inputs = ({ user, socket, room }) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const sendMessage = (file = null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        socket.emit("send_message", { room, msg: reader.result, user: user.current, type: "image" });
        setImage(null);
      };
      reader.readAsDataURL(file);
    } else if (input.trim() !== "") {
      socket.emit("send_message", { room, msg: input, user: user.current, type: "text" });
      setInput("");
    }
  };

  const handleTyping = (isTyping) => {
    socket.emit("user_typing", { room, user: user.current, typing: isTyping });
  };

  return (
    <div className="flex items-center gap-x-4 p-4 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        className="flex-grow bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 p-3 transition duration-300 ease-in-out transform hover:scale-105"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
          handleTyping(true);
        }}
        onKeyUp={() => handleTyping(false)}
      />
      <input
        type="file"
        accept="image/*"
        id="ImageInput"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            sendMessage(file);
            console.log("File selected:", file);
          }
        }}
      />
      <button
        className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110"
        onClick={() => {
          if (input) {
            sendMessage();
          } else {
            document.getElementById("ImageInput").click();
          }
        }}
      >
        <Image src={input ? send : upload} alt="send" height={24} width={24} />
      </button>
    </div>
  );
};

export default Inputs;
