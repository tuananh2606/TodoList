import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'task',
    initialState: [
        {
            title: 'Quet nha',
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
    },
});

// Action creators are generated for each case reducer function
export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
