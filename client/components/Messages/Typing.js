const Typing = ({user}) => {
    return (
        <div className="px-1 md:px-6 py-1 flex">
            <span className="logo text-2xl bg-blue-600 text-white rounded-full py-2 my-auto text-center px-4 mr-2 flex items-center">
                {user.charAt(0).toUpperCase()}
            </span>
            <div className="loader bg-slate-300 rounded-2xl p-5">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Typing