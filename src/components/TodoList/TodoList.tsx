import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todoList: Todo[];
  onSelect?: (todo: Todo) => void;
  selectedTodoId: number | null;
  setActiveTodos: (value: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  selectedTodoId,
  setActiveTodos,
  onSelect = () => {},
}) => {
  const handleToggleIcon = (todoId: number) => {
    setActiveTodos(selectedTodoId === todoId ? null : todoId);
  };

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
        {todoList.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                {' '}
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>{' '}
              </td>
            ) : (
              <td className="is-vcentered"> </td>
            )}

            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  { 'has-text-success': todo.completed },
                  { 'has-text-danger': !todo.completed },
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSelect(todo);
                  handleToggleIcon(todo.id);
                }}
              >
                <span className="icon">
                  {selectedTodoId === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
