import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onDatails: (todo: Todo) => void,
};

export const TodoInfo: FC<Props> = ({ todo, onDatails }) => (
  <>
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
        className={todo.completed
          ? 'has-text-success'
          : 'has-text-danger'}
      >
        {todo.title}
      </p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={() => onDatails(todo)}
      >
        <span className="icon">
          <i className="far fa-eye" />
        </span>
      </button>
    </td>
  </>
);
