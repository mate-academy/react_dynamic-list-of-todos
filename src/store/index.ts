import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { State, Todo, User } from '../react-app-env';

const initialState: State = {
  todos: [],
  user: null,
};

export const setTodos = createAction<Todo[]>('SET_TODOS');
export const addTodo = createAction<Todo>('ADD_TODO');
export const setUser = createAction<User>('SET_USER');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setTodos, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.todos = action.payload;
  });
  builder.addCase(addTodo, (state, action) => {
    state.todos.push(action.payload);
  });
  builder.addCase(setUser, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.user = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
