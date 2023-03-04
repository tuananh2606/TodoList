import { FiTrash } from 'react-icons/fi';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { memo, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = (props) => {
    console.log('re - render');
    const { task, columnId, taskOrder, setItem, setEditing, setIsEnable, setTask, index } = props;
    const id = task.id;
    const notify = () =>
        toast('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });
    // console.log(taskOrder);
    // useEffect(() => {
    //     const days = calculateDate();
    //     if (days > 0 && days <= 1) {
    //         console.log('1');
    //         notify();
    //     }
    // }, []);
    const calculateDate = () => {
        let today = new Date().toISOString().slice(0, 10);
        const startDateTask = taskOrder.tasks[id].startDate;
        const dueDateTask = taskOrder.tasks[id].dueDate;

        let currentDate = new Date(today);
        let date1 = new Date(dueDateTask);
        let date2 = new Date(startDateTask);
        const time = Math.abs(date1 - currentDate);
        const days = Math.ceil(time / (1000 * 60 * 60 * 24));

        if (days > 1) {
            console.log('Date 2 is less than Date 1', days);
        } else if (days > 0 && days <= 1) {
            return days;
        } else {
            console.log('Both Dates are same');
        }
    };
    // calculateDate();
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
            <Draggable draggableId={task.id} key={task.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="w-auto h-auto bg-white rounded-sm mt-2 flex icon-show cursor-pointer hover:bg-[#f4f5f7] ">
                            <div className="w-full h-full text-black flex flex-col mb-1 p-[10px]">
                                <h1 className="text-base">{task.title}</h1>
                                <p className="text-sm">{task.content}</p>
                                <div className="flex items-center">
                                    <BsFillCalendar2WeekFill />
                                    <span className="ml-2">{task.dueDate.replace('T', ' ')}</span>
                                </div>
                            </div>
                            <div className="flex justify-between p-[3px]">
                                <div className="flex items-center flex-col icon">
                                    <BiPencil
                                        className="h-6 w-6 hover:bg-gray-200 rounded-sm p-1 "
                                        onClick={handleClick}
                                    />
                                    <FiTrash onClick={handleDelete} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

            <ToastContainer />
        </>
    );
};

export default memo(Card);
