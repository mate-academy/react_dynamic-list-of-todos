import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onSelect?: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
};

const TodoList: React.FC<Props> = ({
  todos,
  onSelect = () => {},
  selectedTodo,
}) => {
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
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              ) : null}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => onSelect(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      selectedTodo?.id !== todo.id ? ' fa-eye' : 'fa-eye-slash',
                    )}
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

export default TodoList;
