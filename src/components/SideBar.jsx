const SideBar = () => {
    return (
        <div className="h-screen w-[192px] flex flex-col p-4 items-center">
            <h1 className="">ToDo List</h1>
            <div className="flex items-center">
                <h1 className="mr-3">Name</h1>
                <img
                    className="object-contain w-10 h-10 rounded-full"
                    src="https://pbs.twimg.com/media/EbNr05cWAAEAe_6.jpg"
                ></img>
            </div>
        </div>
    );
};

export default SideBar;
