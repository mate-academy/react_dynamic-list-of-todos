import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todoOnView, setTodoOnView } = useContext(TodosContext);

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': todo.id === todoOnView?.id,
      })}
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
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setTodoOnView(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': todo.id !== todoOnView?.id,
                'fa-eye-slash': todo.id === todoOnView?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
