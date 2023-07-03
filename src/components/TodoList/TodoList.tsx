import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { LoadingError } from '../LoadingError';

interface Props {
  todos: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
  hasLoadingError: boolean;
  isLoading: boolean;
  loadTodos: () => void;
}

export const TodoList: FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodo,
  hasLoadingError,
  isLoading,
  loadTodos,
}) => {
  // create a new component called LoadingError
  // if the request fails, render the LoadingError component
  // that will display a message and a button to retry
  if (hasLoadingError) {
    return (
      <LoadingError
        loading={isLoading}
        loadTodos={loadTodos}
      />
    );
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
