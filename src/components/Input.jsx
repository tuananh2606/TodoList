const Input = ({ title, type, className }) => {
    return (
        <div className="flex flex-col my-3">
            <label className="mb-1">{title}</label>
            <input className={`rounded-md p-3 ${className}`} type={type}></input>
        </div>
    );
};

export default Input;
