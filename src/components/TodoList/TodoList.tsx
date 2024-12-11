import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  showSelectedTodo: (todo: Todo) => void;
  selectedOption: string;
  query: string;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  showSelectedTodo,
  selectedOption,
  query,
  selectedTodo,
}) => {
  const filteredList = useMemo(() => {
    return todos
      .filter(todo => {
        switch (selectedOption) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          case 'all':
          default:
            return true;
        }
      })
      .filter(todo =>
        query ? todo.title.toLowerCase().includes(query.toLowerCase()) : true,
      );
  }, [todos, selectedOption, query]);

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
          <th />
        </tr>
      </thead>

      <tbody>
        {filteredList.map(todo => (
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`${
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => showSelectedTodo(todo)}
                aria-label={
                  selectedTodo?.id === todo.id ? 'Deselect todo' : 'Select todo'
                }
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
