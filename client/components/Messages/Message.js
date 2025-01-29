const Message = ({ content, type, own, user }) => {
  if (!user || !user.name) {
    return null; // O muestra un mensaje de error o un componente de carga
  }
  return (
    <div className={`message-container flex ${own ? "justify-end" : "justify-start"} my-2`}>
      {!own && (
        <div className="avatar bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10 mr-3">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className={`message-content max-w-xs md:max-w-md p-4 rounded-lg shadow-lg ${own ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
        {type === "text" ? (
          <p className="text-lg md:text-xl">{content}</p>
        ) : (
          <img src={content} className="rounded-md" alt="image" />
        )}
      </div>
      {own && (
        <div className="avatar bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10 ml-3">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Message;