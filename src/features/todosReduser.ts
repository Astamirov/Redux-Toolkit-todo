import { createReducer, createAction } from '@reduxjs/toolkit';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

type StateTodos = {
    todos: Todo[],
}

const initialState: StateTodos = {
    todos: [{ id: 1, text: 'lorem', completed: false }],
}

export const addTodo = createAction<{id: number; text: string}>('addTodo');
export const removeTodo = createAction<number>('removeTodo');

export const todosReducer = createReducer<StateTodos>(initialState, (builder) => {
    builder
    .addCase(addTodo, (state, action) => {
        state.todos.push({
            id: action.payload.id,
            text: action.payload.text, 
            completed: false
        })
    }) 

    .addCase(removeTodo, (state, action) => {
        state.todos = state.todos.filter((todo) => {
            return todo.id !== action.payload;
        })
    })
})