import React, { useContext } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItems: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const { activeTodo, setActiveTodo } = useContext(TodoContext);

  return (
    <tr
      data-cy="todo"
      className={
        cn({
          'has-background-info-light': todo.completed,
        })
      }

    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p className={`has-text-${completed ? 'success' : 'danger'}`}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            setActiveTodo(todo);
          }}
        >
          <span className="icon">
            <i className={
              `far ${activeTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`
            }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
