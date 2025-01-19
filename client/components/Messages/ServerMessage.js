import Image from "next/image";
import { new_user } from "@/assets";

const ServerMessage = ({ content }) => {
    return (
        <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md">
            <Image src={new_user} className="w-10 h-10 rounded-full mr-4" alt="new user" />
            <p className="text-lg md:text-xl text-white">
                {content}
            </p>
        </div>
    );
};

export default ServerMessage;