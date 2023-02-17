import { FiTrash } from 'react-icons/fi';
import { RxPencil2 } from 'react-icons/rx';

const Card = (props) => {
    const { task, columnId, taskOrder, setItem, setEditing, setIsEnable, setTask } = props;

    const id = task.id;

    const handleDelete = () => {
        const removeTask = taskOrder.columns[columnId].taskIds.filter((element) => {
            return element !== id;
        });
        delete taskOrder.tasks[id];
        taskOrder.columns[columnId].taskIds = removeTask;
        const jsonState = JSON.stringify(taskOrder);
        setItem(jsonState);
    };

    const handleClick = () => {
        setTask(task);
        setEditing(true);
        setIsEnable(true);
    };

    return (
        <>
            <div className="w-auto h-auto bg-white p-3 rounded-lg mt-2 flex">
                <div className="w-full h-full text-black flex flex-col mb-1">
                    <h1 className="text-base">{task.title}</h1>
                    <p className="text-sm">{task.content}</p>
                    {/* <div className="flex items-center">
                    <BsFillCalendar2WeekFill />
                    <span className="ml-2">{task.dateTime}</span>
                </div> */}
                </div>
                <div className="bottom-0 flex justify-between">
                    <div className="flex items-center flex-col">
                        <RxPencil2 className="mb-1" onClick={handleClick} />
                        <FiTrash onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
