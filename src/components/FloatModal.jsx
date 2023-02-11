import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

import Input from './Input';

const FloatModal = ({ setIsEnable }) => {
    // const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // setTasks((prev) => [...prev, data]);
        dispatch(addTask(data));
        setIsEnable(false);
    };

    return (
        <div className="h-screen w-full bg-transparent flex fixed items-center justify-center">
            <div className="max-w-lg w-full relative bg-slate-200 p-4 rounded-xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Add a task</h1>
                    <h1 className="cursor-pointer" onClick={() => setIsEnable(false)}>
                        X
                    </h1>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Title" type="text" register={register} required />
                        <Input label="Date" type="datetime-local" register={register} required />
                        <label>Description</label>
                        <textarea title="Description" className="h-[100px] w-full mt-1" {...register('Description')} />
                        <input
                            className="w-full rounded-md p-2 bg-purple-600 hover:bg-purple-700 text-white text-lg"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FloatModal;
