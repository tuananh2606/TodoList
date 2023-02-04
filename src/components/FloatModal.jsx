import { useState } from 'react';
import Input from './Input';

const FloatModal = ({ setIsEnable }) => {
    return (
        <div className="h-screen w-full bg-transparent flex fixed items-center justify-center">
            <div className="h-[80%] w-96 bg-gray-400 p-4 rounded-xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Add a task</h1>
                    <h1 className="cursor-pointer" onClick={() => setIsEnable(false)}>
                        X
                    </h1>
                </div>
                <div className="mt-4">
                    <Input title="Title" type="text" />
                    <Input title="Date" type="datetime-local" />
                    <Input title="Description" type="textarea" className="h-[100px]" />
                    <button className="w-full rounded-md bg-purple-600 p-2 text-white text-lg hover:bg-purple-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FloatModal;
