import { createSlice } from '@reduxjs/toolkit';
import initialData from '../initialData';
import StorageUtils from '../helpers/StorageUtils';
// const mockData = JSON.parse(StorageUtils.getItem('test'));
if (localStorage.hasOwnProperty('test')) {
    //
}
const initialState = localStorage.hasOwnProperty('test') ? JSON.parse(StorageUtils.getItem('test')) : initialData;

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        updateState: (state, action) => {
            return { ...state };
        },
        addTask: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let idCount = Object.keys(state.tasks).length + 1;
            let idTask = `task-${idCount++}`;
            const newTask = {
                id: idTask,
                content: action.payload.data.Description,
            };
            state.tasks[idTask] = newTask;
            state.columns[action.payload.columnId].taskIds = [
                ...state.columns[action.payload.columnId].taskIds,
                idTask,
            ];
            // const jsonState = JSON.stringify(state);
            // localStorage.setItem('data', jsonState);
        },
        updateTask: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            state.title = action.payload.Title;
            state.dateTime = action.payload.Date;
            state.describe = action.payload.Description;
        },
        deleteTask: (state, action) => {
            const removeTask = state.columns[action.payload.columnId].taskIds.filter((element) => {
                return element !== action.payload.id;
            });
            delete state.tasks[action.payload.id];
            state.columns[action.payload.columnId].taskIds = removeTask;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTask, deleteTask, updateState } = taskSlice.actions;

export default taskSlice.reducer;
