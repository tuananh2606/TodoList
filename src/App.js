import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import SideBar from './components/SideBar';
import Column from './components/Column';
import initialData from './initialData';
import StorageUtils from './helpers/StorageUtils';
import api from './services/api';
import Login from './pages/Login';
import Header from './layouts/Header';

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
    const [taskOrder, setTaskOrder] = useState(tasks || {});
    const [tasksTest, setTasks] = useState();
    const [item, setItem] = useLocalStorage('test');
    const [user, setUser] = useState({});
    const [isSuccess, setSuccess] = useState(false);

    useEffect(() => {
        if (tasksTest !== undefined) {
            const jsonState = JSON.stringify(tasksTest);
            setItem(jsonState);
        }
    }, [tasksTest]);

    const notify = () =>
        toast('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });
    const calculateDate = () => {
        let today = new Date().toISOString().slice(0, 10);
        let currentDate = new Date(today);

        const vals = Object.keys(taskOrder.tasks).map((key) => taskOrder.tasks[key]);
        vals.map((item, index) => {
            let date1 = new Date(item.dueDate);
            const time = Math.abs(date1 - currentDate);
            const days = Math.ceil(time / (1000 * 60 * 60 * 24));
            if (days > 0 && days <= 1) {
                console.log('vao');
                notify();
            }
        });
    };
    calculateDate();

    useEffect(() => {
        const data = JSON.parse(item);
        setTaskOrder(data);
    }, [item]);

    const onDragEnd = (result) => {
        //Reorder column
        const { source, destination } = result;
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
    };

    return (
        <>
            {isSuccess ? (
                <>
                    <Header />
                    <div className="flex justify-between h-screen">
                        <SideBar user={user} />
                        <div className=" p-3 w-full bg-[#0079bf]">
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
                        <ToastContainer />
                    </div>
                </>
            ) : (
                <Login setSuccess={setSuccess} setUser={setUser} />
            )}
        </>
    );
}

export default App;
