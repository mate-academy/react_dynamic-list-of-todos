import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo?: Todo | null;
  onSelect?: (post: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect = () => {},
  selectedTodo,
}) => (
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
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames('', {
            'has-background-info-light': selectedTodo?.id === todo.id,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed === true ? (
            <td className="is-vcentered">
              <i className="fas fa-check" data-cy="iconCompleted" />
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p
              className={classNames('has-text-success', {
                'has-text-danger': todo.completed === false,
              })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              onClick={() => onSelect(todo)}
              type="button"
            >
              <span className="icon">
                <i
                  className={`far ${selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'far fa-eye'}`}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
