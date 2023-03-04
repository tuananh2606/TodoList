const SideBar = ({ user }) => {
    return (
        <>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>
            <aside
                id="default-sidebar"
                className="h-screen w-[260px] flex flex-col items-center bg-[#0066a0] transition-transform -translate-x-full sm:translate-x-0"
            >
                <h1 className="text-xl text-white">ToDo List</h1>
                <div className="mt-3 flex items-center">
                    <img
                        className="object-contain w-10 h-10"
                        src="https://pbs.twimg.com/media/EbNr05cWAAEAe_6.jpg"
                        alt="Anh"
                    />
                    <h1 className="mr-3 text-white">{user.name}</h1>
                </div>
                <hr className="w-full my-2 p-y border-gray-400" />
                <ul className="w-full">
                    <li className="text-white w-full p-2 hover:bg-gray-500">List Item</li>
                    <li className="text-white w-full p-2 hover:bg-gray-500">List Item</li>
                    <li className="text-white w-full p-2 hover:bg-gray-500">List Item</li>
                    <li className="text-white w-full p-2 hover:bg-gray-500">List Item</li>
                    <li className="text-white w-full p-2 hover:bg-gray-500">List Item</li>
                </ul>
            </aside>
        </>
    );
};

export default SideBar;
