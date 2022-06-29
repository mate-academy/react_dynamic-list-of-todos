import { State } from '../react-app-env';

export const getTodosSelector = (state: State) => state.todos;

export const getUserSelector = (state: State) => state.user;

export const getFilteredTodosSelector = (query: string) => {
  const filteredTodosSelector = (state: State) => {
    return state.todos.filter(todo => (
      todo.title.includes(query)
    ));
  };

  return filteredTodosSelector;
};
