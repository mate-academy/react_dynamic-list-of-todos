import { FC } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectedTodoId: number | null;
  onSelect: (id: number | null) => void;
};

export const TodoItem: FC<Props> = ({ todo, selectedTodoId, onSelect }) => (
  <tr data-cy="todo" className="">
    <td className="is-vcentered">{todo.id}</td>
    {todo.completed ? (
      <td className="is-vcentered">
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      </td>
    ) : (
      <td className="is-vcentered" />
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
        onClick={() => onSelect(todo.id)}
      >
        <span className="icon">
          {selectedTodoId && selectedTodoId === todo.id ? (
            <i className="far fa-eye-slash" />
          ) : (
            <i className="far fa-eye" />
          )}
        </span>
      </button>
    </td>
  </tr>
);
