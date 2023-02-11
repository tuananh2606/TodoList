import React from 'react';

const Input = ({ label, type, className, register, required }) => {
    return (
        <div className="flex flex-col my-3">
            <label className="mb-1">{label}</label>
            <input {...register(label, { required })} className={`rounded-md p-3 ${className}`} type={type} />
        </div>
    );
};
export default Input;
