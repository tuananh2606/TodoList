import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'task',
    initialState: [
        {
            id: 't-1',
            title: 'Quet nha',
            dateTime: '2001',
            describe: 'Test',
        },
        {
            id: 't-2',
            title: 'Quet nha1',
            dateTime: '2001',
            describe: 'Test',
        },
        {
            id: 't-3',
            title: 'Quet nha2',
            dateTime: '2001',
            describe: 'Test',
        },
        {
            id: 't-4',
            title: 'Quet nha3',
            dateTime: '2001',
            describe: 'Test',
        },
    ],
    reducers: {
        addTask: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const newTask = {
                title: action.payload.Title,
                dateTime: action.payload.Date,
                describe: action.payload.Description,
            };
            state.push(newTask);
        },
        deleteTask: (state, action) => {
            state.splice(action.payload, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
