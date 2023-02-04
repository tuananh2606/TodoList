import { useState } from 'react';
import CardList from './components/CardList';
import SideBar from './components/SideBar';
import FloatModal from './components/FloatModal';

function App() {
    const [isEnable, setIsEnable] = useState(false);
    console.log(isEnable);
    return (
        <div className="flex justify-between">
            <SideBar />
            <div className="bg-gray-300 p-3">
                <button
                    className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500"
                    onClick={() => setIsEnable((p) => !p)}
                >
                    Add new task
                </button>
                <CardList />
            </div>
            {isEnable && <FloatModal setIsEnable={setIsEnable} />}
            <SideBar />
        </div>
    );
}

export default App;
