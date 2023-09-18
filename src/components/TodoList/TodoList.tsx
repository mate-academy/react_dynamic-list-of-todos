import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onToggleModal: (todo:Todo | null) => void;
  choseTodoId: number | undefined;
};

export const TodoList: React.FC<Props> = ({
  todos, onToggleModal,
  choseTodoId,
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
            <p
              className={
                classnames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })
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
              onClick={() => onToggleModal(todo)}
            >
              <span className="icon">
                <i className={classnames('far', {
                  'fa-eye': choseTodoId !== todo.id,
                  'fa-eye-slash': choseTodoId === todo.id,
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
