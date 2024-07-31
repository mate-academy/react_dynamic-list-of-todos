import { Todo } from '../types/Todo';

export const filterTodos = (
  searchWord: string,
  selectValue: string,
  todos: Todo[],
) => {
  return todos
    .filter(todo => todo.title.toLowerCase().includes(searchWord.toLowerCase()))
    .filter(todo => {
      switch (selectValue) {
        case 'all':
          return true;
          break;
        case 'completed':
          return todo.completed === true;
          break;
        case 'active':
          return todo.completed === false;
          break;
        default:
          return true;
          break;
      }
    });
};
