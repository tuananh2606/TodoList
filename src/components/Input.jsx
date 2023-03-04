import React from 'react';

const InputForm = ({ label, type, className, register, required }) => {
    return (
        <div className="flex flex-col my-3">
            <label className="mb-1">{label}</label>
            <input {...register(label, { required })} className={`rounded-md p-3 ${className}`} type={type} />
        </div>
    );
};

export const Input = ({ label, type, className, placeHolder, onChange, name, value }) => {
    const inputRef = React.useRef(null);
    return (
        <div className="flex flex-col my-3">
            <label className="mb-1">{label}</label>
            <input
                ref={inputRef}
                className={`rounded-md p-3 ${className}`}
                value={value}
                type={type}
                name={name}
                placeholder={placeHolder}
                onChange={onChange}
            />
        </div>
    );
};
export default InputForm;
