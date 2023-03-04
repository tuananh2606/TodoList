import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { IoCloseOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

import Card from './Card';
import FloatModal from './FloatModal';
import InputForm from './Input';

const Column = (props) => {
    const { column, tasks, taskOrder, setItem } = props;
    const [isEnable, setIsEnable] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [task, setTask] = useState();

    const { register, handleSubmit, reset } = useForm();

    const addTask = (data) => {
        let idCount = Object.keys(taskOrder.tasks).length + 1;
        let idTask = `task-${idCount++}`;
        const newTask = {
            id: idTask,
            content: data.Title,
            dueDate: data.DueDate,
        };
        taskOrder.tasks[idTask] = newTask;
        taskOrder.columns[column.id].taskIds = [...taskOrder.columns[column.id].taskIds, idTask];
        return taskOrder;
    };

    const onSubmit = (data) => {
        const tasks = addTask(data);
        const jsonState = JSON.stringify(tasks);
        setItem(jsonState);
        setOpen(false);
        reset();
    };

    return (
        <>
            <div className="border-2 w-72 bg-gray-200 rounded-[4px] m-2">
                <h1 className="text-lg pt-2 px-2">{column.title}</h1>
                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                        <div
                            className={`${column.id} ${snapshot.isDraggingOver ? 'bg-slate-500' : 'bg-inherit'}  p-2`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {tasks.map((task, index) => (
                                <Card
                                    task={task}
                                    key={task.id}
                                    index={index}
                                    columnId={column.id}
                                    taskOrder={taskOrder}
                                    setItem={setItem}
                                    setEditing={setEditing}
                                    setIsEnable={setIsEnable}
                                    setTask={setTask}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {isOpen && (
                    <div className="border-[2px] border-white p-1 mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputForm label="Title" type="text" register={register} required />
                            <InputForm label="DueDate" type="date" register={register} required />
                            <div className="flex items-center mt-2">
                                <button className="bg-[#0079BF] px-3 py-1 text-white rounded-sm ">Add card</button>
                                <IoCloseOutline
                                    className="ml-2 cursor-pointer"
                                    size="28px"
                                    color="#8891A2"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                )}

                <div
                    className="mt-3 p-1 rounded-md hover:bg-slate-400 cursor-pointer"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    {!isOpen && <span>+ Add a card</span>}
                </div>
            </div>
            {isEnable && (
                <FloatModal
                    setIsEnable={setIsEnable}
                    taskOrder={taskOrder}
                    isEditing={isEditing}
                    task={task}
                    setEditing={setEditing}
                    setItem={setItem}
                />
            )}
        </>
    );
};

export default Column;
