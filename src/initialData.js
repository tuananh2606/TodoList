// export const initialData = [
//     {
//         colId: 'col-1',
//         title: ' 📃 To do',
//         tasks: [
//             {
//                 id: 't-1',
//                 title: 'Quet nha',
//                 dateTime: '2001',
//                 describe: 'Test',
//             },
//             {
//                 id: 't-4',
//                 title: 'Quet nha3',
//                 dateTime: '2001',
//                 describe: 'Test',
//             },
//         ],
//     },
//     {
//         colId: 'col-2',
//         title: ' ✏️ In progress',
//         tasks: [
//             {
//                 id: 't-2',
//                 title: 'Quet nha1',
//                 dateTime: '2001',
//                 describe: 'Test',
//             },
//         ],
//     },
//     {
//         colId: 'col-3',
//         title: ' ✔️ Completed',
//         tasks: [
//             {
//                 id: 't-3',
//                 title: 'Quet nha2',
//                 dateTime: '2001',
//                 describe: 'Test',
//             },
//         ],
//     },
// ];
const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: ' 📃 To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'column-2': {
            id: 'column-2',
            title: ' ✏️ In progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: ' ✔️ Done',
            taskIds: [],
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
