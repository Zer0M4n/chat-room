import { useState } from "react";
import Image from "next/image";
import send from "@/assets/send.svg"; // Asegúrate de que la ruta sea correcta
import upload from "@/assets/upload.svg"; // Asegúrate de que la ruta sea correcta

const Inputs = ({ user, socket, room }) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const sendMessage = (file = null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        socket.emit("send_message", { room, msg: reader.result, 
          user: user.current, type: "image" });
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
    <div className="flex items-center gap-x-4">
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="w-9 py-2 px-3 bg-gray-600 text-white font-bold rounded-md text-xl md:w-1/12 md:text-2xl"
        onClick={() => {
          if (input) {
            sendMessage();
          } else {
            document.getElementById("ImageInput").click();
          }
        }}
      >
        <Image src={input ? send : upload} className="w-3 md:w-6 mx-auto size-8 md:size-10" alt="send" height={5} width={5} />
      </button>
    </div>
  );
};

export default Inputs;
