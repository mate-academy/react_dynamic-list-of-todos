import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null,
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
}) => (
  <tr
    data-cy="todo"
    className={classNames({
      'has-background-info-light': selectedTodo?.id === todo.id,
    })}
    key={todo.id}
  >
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered" />
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
        onClick={() => setSelectedTodo(todo)}
      >
        <span className="icon">
          <i
            className={classNames('far', {
              'fa-eye-slash': todo.id === selectedTodo?.id,
              'fa-eye': todo.id !== selectedTodo?.id,
            })}
          />
        </span>
      </button>
    </td>
  </tr>
);
