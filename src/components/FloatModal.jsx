import { useState } from 'react';

const FloatModal = ({ setIsEnable }) => {
    const [isCloseModal, setIsCloseModal] = useState(false);
    return (
        <div className="h-screen w-full bg-transparent flex fixed items-center justify-center">
            <div className="h-[80%] w-96 bg-gray-400 p-4 rounded-xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Add a task</h1>
                    <h1 className="cursor-pointer" onClick={() => setIsEnable(false)}>
                        X
                    </h1>
                </div>
                <div className="mt-4 flex flex-col">
                    <label>Title</label>
                    <input type="text"></input>
                    <label>Date</label>
                    <input type="datetime-local"></input>
                    <label>Description</label>
                    <input type="text"></input>
                </div>
            </div>
        </div>
    );
};

export default FloatModal;
