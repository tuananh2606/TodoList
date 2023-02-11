import { FiTrash } from 'react-icons/fi';
import { RxPencil2 } from 'react-icons/rx';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/taskSlice';
import Button from './Button';

const Card = (props) => {
    const { task, index } = props;
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(index));
    };

    return (
        <div className="w-auto h-auto bg-white p-3 rounded-lg mt-2">
            <div className="w-full h-full text-black flex flex-col mb-1">
                <h1 className="text-base">{task.title}</h1>
                <p className="text-sm">{task.describe}</p>
                <div className="flex items-center">
                    <BsFillCalendar2WeekFill />
                    <span className="ml-2">{task.dateTime}</span>
                </div>
            </div>
            {/* <div className="bottom-0 flex justify-between">
                <button className="px-2 py-1 bg-green-400 rounded-full">Complete</button>
                <div className="flex items-center">
                    <FiTrash onClick={handleDelete} />
                    <Button icon={<RxPencil2 />} />
                </div>
            </div> */}
        </div>
    );
};

export default Card;
