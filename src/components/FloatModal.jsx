import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
const FloatModal = ({ setIsEnable, columnId, setTasks, taskOrder, title, task, isEditing, setTaskUpdate }) => {
    // const [input, setInput] = useState(task.content);
    const addTask = (data) => {
        let idCount = Object.keys(taskOrder.tasks).length + 1;
        let idTask = `task-${idCount++}`;
        const newTask = {
            id: idTask,
            content: data.Description,
        };
        taskOrder.tasks[idTask] = newTask;
        taskOrder.columns['column-1'].taskIds = [...taskOrder.columns['column-1'].taskIds, idTask];
        return taskOrder;
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const handleChange = (e) => {
    //     setInput(e.target.value);
    // };
    // console.log(input);
    const onSubmit = (data) => {
        // if (isEditing) {
        //     const id = task.id;
        //     setTaskUpdate({ data, id: task.id });
        // }
        const tasks = addTask(data);
        setTasks(tasks);
        setIsEnable(false);
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
                            {/* <Input label="Date" type="datetime-local" register={register} required /> */}
                            <label>Description</label>
                            <textarea
                                title="Description"
                                className="h-[100px] w-full mt-1"
                                {...register('Description', {})}
                            />
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <Input label="Title" type="text" register={register} required /> */}
                            {/* <Input label="Date" type="datetime-local" register={register} required /> */}
                            <label>Description</label>
                            <textarea
                                title="Description"
                                className="h-[100px] w-full mt-1"
                                {...register('Description', {})}
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
