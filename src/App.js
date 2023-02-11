import { useState } from 'react';
import { useSelector } from 'react-redux';
import CardList from './components/CardList';
import SideBar from './components/SideBar';
import FloatModal from './components/FloatModal';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
    const [isEnable, setIsEnable] = useState(false);
    const tasks = useSelector((state) => state.task);
    const [taskOrder, setTaskOrder] = useState(tasks);

    const initalColumn = ['col-1'];

    const onDragEnd = (result) => {
        //Reorder column
        if (!result.destination) return;

        const items = Array.from(taskOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTaskOrder(items);
        console.log(result);
    };

    return (
        <div className="flex justify-between">
            <SideBar />
            <div className=" p-3 w-[calc(100%-192px)]">
                <button
                    className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 float-right"
                    onClick={() => setIsEnable((prev) => !prev)}
                >
                    Add new task
                </button>
                {/* <CardList /> */}
                {isEnable && <FloatModal setIsEnable={setIsEnable} />}
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex">
                        {initalColumn.map((columnId, index) => (
                            <Column columnId={columnId} key={index} />
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
