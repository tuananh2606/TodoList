import { useState } from 'react';
import { useForm } from 'react-hook-form';
const FloatModal = ({ setIsEnable, taskOrder, title, task, isEditing, setEditing, setItem }) => {
    const [input, setInput] = useState(task?.content !== undefined ? task.content : '');
    const [date, setDate] = useState(task?.dueDate !== undefined ? task.dueDate : '');

    const updateTask = (data) => {
        taskOrder.tasks[task.id].id = task.id;
        taskOrder.tasks[task.id].content = data.Title;
        taskOrder.tasks[task.id].dueDate = data.dueDate;
        return taskOrder;
    };

    const { register, handleSubmit } = useForm();

    const onSubmitUpdate = (data) => {
        const updatedTask = updateTask(data);
        const jsonState = JSON.stringify(updatedTask);
        setItem(jsonState);
        setIsEnable(false);
        setEditing(false);
    };

    return (
        <div className="h-full w-full bg-[rgba(71,85,105,.2)] flex fixed top-0 left-0 items-center justify-center">
            {isEditing && (
                <div className="max-w-lg w-full relative bg-slate-200 p-4 rounded-xl">
                    <div className="flex justify-between">
                        <h1 className="text-3xl">{title}</h1>
                        <h1 className="cursor-pointer" onClick={() => setIsEnable(false)}>
                            X
                        </h1>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit(onSubmitUpdate)}>
                            <label>Title</label>
                            <textarea
                                title="Title"
                                value={input}
                                className="h-[100px] w-full mt-1"
                                {...register('Title', {
                                    onChange: (e) => setInput(e.target.value),
                                })}
                            />
                            <input
                                title="dueDate"
                                type="date"
                                value={date}
                                className="rounded-md p-3 w-full my-2"
                                {...register('dueDate', {
                                    onChange: (e) => setDate(e.target.value),
                                })}
                            />
                            <input
                                className="w-full rounded-md p-2 bg-purple-600 hover:bg-purple-700 text-white text-lg"
                                type="submit"
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatModal;
