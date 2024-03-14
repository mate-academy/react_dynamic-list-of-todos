import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
  status: string;
  query: string;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodo,
  status,
  query,
}) => {
  let filteredTodos = todos;

  switch (status) {
    case 'active':
      filteredTodos = todos.filter(todo => todo.completed === false);
      break;
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed === true);
      break;
    default:
      filteredTodos = todos;
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
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
        {filteredTodos.map(todo => {
          return todo.completed ? (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames('', {
                'has-background-info-light':
                  selectedTodo && todo.id === selectedTodo.id,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                <p className="has-text-success">{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(todo)}
                >
                  <span className="icon">
                    {selectedTodo && todo.id === selectedTodo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          ) : (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames('', {
                'has-background-info-light':
                  selectedTodo && todo.id === selectedTodo.id,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(todo)}
                >
                  <span className="icon">
                    {selectedTodo && todo.id === selectedTodo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
