import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  onSetSelectedTodo: (todo: Todo) => void
  selectedTodo: Todo | null
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSetSelectedTodo,
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
          data-cy="todo"
          key={todo.id}
          className={classNames(
            { 'has-background-info-light': selectedTodo?.id === todo.id },
          )}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={
              todo.completed ? 'has-text-success' : 'has-text-danger'
            }
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSetSelectedTodo(todo)}
            >
              <span className="icon">
                <i className={classNames(
                  'far',
                  {
                    'fa-eye': todo !== selectedTodo,
                    'fa-eye-slash': todo === selectedTodo,
                  },
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
