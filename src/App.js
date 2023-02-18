import { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import FloatModal from './components/FloatModal';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import StorageUtils from './helpers/StorageUtils';
import axios from 'axios';
import api from './services/api';

const reorderColumn = (sourceCol, startIndex, endIndex, destinationCol) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);

    if (destinationCol) {
        const newColumTaskIds = Array.from(destinationCol.taskIds);
        newColumTaskIds.splice(endIndex, 0, removed);
        const prevColumn = {
            ...sourceCol,
            taskIds: newTaskIds,
        };
        const newColumn = {
            ...destinationCol,
            taskIds: newColumTaskIds,
        };
        return { newColumn, prevColumn };
    } else {
        newTaskIds.splice(endIndex, 0, removed);
        const newColumn = {
            ...sourceCol,
            taskIds: newTaskIds,
        };
        return newColumn;
    }
};
function useLocalStorage(key) {
    const [state, setState] = useState(localStorage.getItem(key));
    function setStorage(item) {
        localStorage.setItem(key, item);
        setState(item);
    }
    return [state, setStorage];
}

function App() {
    if (!localStorage.hasOwnProperty('test')) {
        StorageUtils.setItem('test', JSON.stringify(initialData));
    }
    const tasks = JSON.parse(StorageUtils.getItem('test'));
    const [isEnable, setIsEnable] = useState(false);
    const [taskOrder, setTaskOrder] = useState(tasks || {});
    const [tasksTest, setTasks] = useState();
    const [item, setItem] = useLocalStorage('test');

    useEffect(() => {
        if (tasksTest !== undefined) {
            const jsonState = JSON.stringify(tasksTest);
            setItem(jsonState);
        }
    }, [tasksTest]);

    useEffect(() => {
        const data = JSON.parse(item);
        setTaskOrder(data);
    }, [item]);

    useEffect(() => {
        api.create()
            .getBoard()
            .then((response) => {
                const { data } = response;
                //         // xử trí khi thành công
                //         console.log(response);
                //     })
                console.log('data ', response);
                // setTaskOrder(data.columns);
            })
            .catch((error) => {
                const { message } = error;
                console.log('error: ', message);
            });
    }, []);

    const onDragEnd = (result) => {
        //Reorder column
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceCol = taskOrder.columns[source.droppableId];
        const destinationCol = taskOrder.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumn(sourceCol, source.index, destination.index);
            const newState = {
                ...taskOrder,
                columns: {
                    ...taskOrder.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setTaskOrder(newState);
            const jsonState = JSON.stringify(newState);
            localStorage.setItem('data', jsonState);
            setItem(jsonState);
            return;
        }

        const newData = reorderColumn(sourceCol, source.index, destination.index, destinationCol);
        const { newColumn, prevColumn } = newData;
        const newState = {
            ...taskOrder,
            columns: {
                ...taskOrder.columns,
                [prevColumn.id]: prevColumn,
                [newColumn.id]: newColumn,
            },
        };

        setTaskOrder(newState);
        const jsonState = JSON.stringify(newState);
        localStorage.setItem('data', jsonState);
        setItem(jsonState);
        return;
    };

    return (
        <div className="flex justify-between">
            <SideBar />
            <div className=" p-3 w-[calc(100%-192px)]">
                <button
                    className="bg-purple-600 w-full mt-2 text-white p-2 rounded-lg hover:bg-purple-500"
                    onClick={() => setIsEnable((prev) => !prev)}
                >
                    Add new task
                </button>
                {isEnable && (
                    <FloatModal
                        setIsEnable={setIsEnable}
                        setTasks={setTasks}
                        taskOrder={taskOrder}
                        title="Add a task"
                    />
                )}
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex">
                        {taskOrder.columnOrder.map((columnId) => {
                            const column = taskOrder.columns[columnId];
                            const tasks = column.taskIds.map((taskId) => taskOrder.tasks[taskId]);

                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    taskOrder={taskOrder}
                                    setItem={setItem}
                                />
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
