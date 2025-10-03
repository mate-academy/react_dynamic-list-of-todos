import { Todo, TodoStatus } from '../types/Todo';

/**
 * TBH, I don't need to move this function into a dedicated utility file
 * since I use it only once, but why not?
 * Maybe it's a good idea to make the application more scalable.
 *
 * I also searched the internet to see if it's okay to use JSDoc and TypeScript together,
 * and it seems fine, right? I hope this won't be a reason to reject this task, lol))))
 *
 * @param {todo[]} todos
 * @param {TodoStatus} filterMethod
 * @param {string} query
 * @returns {Todo[]}
 */
export function getFilteredTodos(
  todos: Todo[],
  filterMethod: TodoStatus,
  query: string,
): Todo[] {
  return todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    const method = filterMethod.charAt(0).toUpperCase() + filterMethod.slice(1);

    const matchesStatus =
      method === TodoStatus.All ||
      (method === TodoStatus.Active && !todo.completed) ||
      (method === TodoStatus.Completed && todo.completed);

    return matchesQuery && matchesStatus;
  });
}
