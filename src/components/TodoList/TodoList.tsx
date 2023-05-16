import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  hasLoadingError: boolean,
  onAgain(): void,
  selectedTodo: Todo | null,
  onSelect(userId: number, todo: Todo | null): void,
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onSelect,
    hasLoadingError,
    onAgain,
    selectedTodo,
  }) => {
    if (hasLoadingError) {
      return (
        <button
          type="button"
          onClick={() => onAgain()}
        >
          Try again
        </button>
      );
    }

    if (todos.length === 0) {
      return (
        <p>No todos....</p>
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
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectedTodo={selectedTodo}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    );
  },
);
