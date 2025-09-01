import { getTodos } from '../api';
import { Todo } from '../types/Todo';

export function fetchPostsFromTodos(): Promise<Todo[]> {
  return getTodos().then(todos => {
    const uniquePosts = Array.from(
      new Map(todos.map(post => [post.id, post])).values(),
    );

    return uniquePosts;
  });
}
