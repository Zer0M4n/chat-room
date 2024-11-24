const Message = ({ content, type, own, user }) => {
  if (!user || !user.name) {
    return null; // O muestra un mensaje de error o un componente de carga
  }

  return (
    <p className={`message px-1 md:px-6 py-1 flex ${own ? "justify-end" : "justify-start"}`}>
      {!own && (
        <span className={`logo text-2xl bg-slate-50 text-black rounded-full py-2 text-center px-4 mr-2 flex items-center 
          ${type === "text" ? "my-auto" : "max-h-12"}`}>
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className={`text-xl md:text-3xl py-2 rounded-2xl 
        ${type === "text" ? "px-6" : "px-2"}
        ${own ? "bg-slate-400 text-white" : " bg-slate-300"}`}>
        {type === "text" ? content : <img src={content} className="rounded-md" alt="image" />}
      </span>
      {own && (
        <span className={`logo text-2xl bg-slate-50 text-black rounded-full py-2 text-center px-4 ml-2 flex items-center 
          ${type === "text" ? "my-auto" : "max-h-12"}`}>
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
    </p>
  );
};

export default Message;