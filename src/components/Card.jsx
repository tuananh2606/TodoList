import { FiTrash } from 'react-icons/fi';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
const Card = ({ task }) => {
    console.log(task);
    return (
        <div className="w-auto h-64 bg-white p-3 rounded-lg">
            <div className="w-full h-48 text-black flex flex-col mb-1">
                <h1 className="text-base">{task.title}</h1>
                <p className="text-sm flex-1">{task.describe}</p>
                <div className="flex items-center">
                    <BsFillCalendar2WeekFill />
                    <span>{task.dateTime}</span>
                </div>
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
