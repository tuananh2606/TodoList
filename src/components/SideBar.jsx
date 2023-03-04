const SideBar = ({ user }) => {
    console.log(user);
    return (
        <div className="h-screen w-[260px] flex flex-col p-4 items-center bg-[#0066a0]">
            <h1 className="">ToDo List</h1>
            <div className="flex items-center">
                <img
                    className="object-contain w-10 h-10 rounded-full"
                    src="https://pbs.twimg.com/media/EbNr05cWAAEAe_6.jpg"
                    alt="Anh"
                />
                <h1 className="mr-3">{user.name}</h1>
            </div>
        </div>
    );
};

export default SideBar;
