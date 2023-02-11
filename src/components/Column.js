import { Droppable, Draggable } from 'react-beautiful-dnd';
import CardList from '../components/CardList';
import Card from './Card';
import { useSelector } from 'react-redux';

const Column = (props) => {
    const { columnId } = props;
    const tasks = useSelector((state) => state.task);
    console.log(tasks);
    return (
        <div className="border-2 w-64 p-3 bg-gray-300">
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div className={`${columnId}`} {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Draggable draggableId={task.id} key={task.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
