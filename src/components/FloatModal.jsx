import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import StorageUtils from '../helpers/StorageUtils';
const FloatModal = ({ setIsEnable, setTasks, taskOrder, title, task, isEditing, setEditing }) => {
    const [input, setInput] = useState(task?.content !== undefined ? task.content : '');
    const addTask = (data) => {
        let idCount = Object.keys(taskOrder.tasks).length + 1;
        let idTask = `task-${idCount++}`;
        const newTask = {
            id: idTask,
            content: data.Description,
            date: data.Date,
        };
        taskOrder.tasks[idTask] = newTask;
        taskOrder.columns['column-1'].taskIds = [...taskOrder.columns['column-1'].taskIds, idTask];
        return taskOrder;
    };

    const updateTask = (data) => {
        taskOrder.tasks[task.id].id = task.id;
        taskOrder.tasks[task.id].content = data.Description;
        taskOrder.tasks[task.id].date = data.Date;
        return taskOrder;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const tasks = addTask(data);
        setTasks(tasks);
        setIsEnable(false);
    };
    const onSubmitUpdate = (data) => {
        const updatedTask = updateTask(data);
        StorageUtils.setItem('test', JSON.stringify(updatedTask));
        setIsEnable(false);
        setEditing(false);
    };

    return (
        <div className="h-screen w-full bg-transparent flex fixed items-center justify-center">
            {!isEditing && (
                <div className="max-w-lg w-full relative bg-slate-200 p-4 rounded-xl">
                    <div className="flex justify-between">
                        <h1 className="text-3xl">{title}</h1>
                        <h1 className="cursor-pointer" onClick={() => setIsEnable(false)}>
                            X
                        </h1>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <Input label="Title" type="text" register={register} required /> */}

                            <label>Description</label>
                            <textarea
                                title="Description"
                                className="h-[100px] w-full mt-1"
                                {...register('Description', {})}
                            />
                            <Input label="Date" type="datetime-local" register={register} required />
                            <input
                                className="w-full rounded-md p-2 bg-purple-600 hover:bg-purple-700 text-white text-lg"
                                type="submit"
                            />
                        </form>
                    </div>
                </div>
            )}

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
                            {/* <Input label="Title" type="text" register={register} required /> */}

                            <label>Description</label>
                            <textarea
                                title="Description"
                                value={input}
                                className="h-[100px] w-full mt-1"
                                {...register('Description', {
                                    onChange: (e) => setInput(e.target.value),
                                })}
                            />
                            <Input label="Date" type="datetime-local" register={register} required />
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
