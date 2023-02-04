import { FiTrash } from 'react-icons/fi';

const Card = () => {
    return (
        <div className="w-64 h-64 bg-white p-3 rounded-lg">
            <div className="w-full h-48">
                <h1 className="text-base text-black">Title</h1>
                <p className="text-sm">This is the description for this task</p>
            </div>
            <div className="bottom-0 flex justify-between">
                <button className="px-2 py-1 bg-green-400 rounded-full">Complete</button>
                <div className="flex items-center">
                    <button>
                        <FiTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
