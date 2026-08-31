import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onSelectTodo: (selectedTodoId: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelectTodo,
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
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon">
                <i className="fas fa-check" data-cy="iconCompleted" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              onClick={() => onSelectTodo(todo)}
              data-cy="selectButton"
              className="button"
              type="button"
            >
              <span className="icon">
                <i
                  className={classNames({
                    'far fa-eye-slash': todo.id === selectedTodo?.id,
                    'far fa-eye': todo.id !== selectedTodo?.id,
                  })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
