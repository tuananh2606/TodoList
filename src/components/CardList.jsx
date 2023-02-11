import Card from './Card';
import { useSelector } from 'react-redux';

const CardList = () => {
    const tasks = useSelector((state) => state.task);
    console.log(tasks);
    return (
        <div className="">
            <h1 className="text-3xl mb-4">Tasks</h1>
            <div className="grid gap-2 grid-cols-4">
                {tasks && tasks.length > 0 && tasks.map((task, index) => <Card task={task} key={index} />)}
            </div>
        </div>
    );
};

export default CardList;
