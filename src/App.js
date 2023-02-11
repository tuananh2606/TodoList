import { useState } from 'react';
import CardList from './components/CardList';
import SideBar from './components/SideBar';
import FloatModal from './components/FloatModal';

function App() {
    const [isEnable, setIsEnable] = useState(false);
    return (
        <div className="flex justify-between">
            <SideBar />
            <div className="bg-gray-300 p-3 w-[calc(100%-192px)]">
                <button
                    className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 float-right"
                    onClick={() => setIsEnable((prev) => !prev)}
                >
                    Add new task
                </button>
                <CardList />
            </div>
            {isEnable && <FloatModal setIsEnable={setIsEnable} />}
        </div>
    );
}

export default App;
