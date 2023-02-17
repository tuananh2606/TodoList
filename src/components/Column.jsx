import { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import FloatModal from './FloatModal';
const Column = (props) => {
    const { column, tasks, taskOrder, setItem } = props;
    const [isEnable, setIsEnable] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [task, setTask] = useState();

    return (
        <>
            <div className="border-2 w-64 p-2 bg-gray-300 rounded-lg m-2">
                <h1 className="text-lg">{column.title}</h1>
                <Droppable droppableId={column.id}>
                    {(provided) => (
                        <div className={`${column.id}, mt-3`} {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable draggableId={task.id} key={task.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card
                                                task={task}
                                                key={task.id}
                                                index={index}
                                                columnId={column.id}
                                                taskOrder={taskOrder}
                                                setItem={setItem}
                                                setEditing={setEditing}
                                                setIsEnable={setIsEnable}
                                                setTask={setTask}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            {isEnable && (
                <FloatModal setIsEnable={setIsEnable} taskOrder={taskOrder} isEditing={isEditing} task={task} />
            )}
        </>
    );
};

export default Column;
