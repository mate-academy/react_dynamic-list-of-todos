import { Todo } from '../types/Todo';
import { getData } from '../Utils/UtilsClient';

export function getTodos(todoId?: number): Promise<Todo | Todo[]> {
  return getData<Todo[]>(`/todos.json`).then(posts => {
    if (todoId !== undefined) {
      return posts.find(todo => todo.id === todoId) as Todo;
    }

    return posts;
  });
}
