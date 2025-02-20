import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleEditItem: (id: number) => void;
  isSelected: boolean;
};
export const TodoItem: React.FC<Props> = ({
  todo,
  handleEditItem,
  isSelected,
}: Props) => (
  <tr data-cy="todo" className="">
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered">
      {todo.completed && (
        <th>
          <span className="icon">
            <i className="fas fa-check" data-cy="iconCompleted" />
          </span>
        </th>
      )}
    </td>
    <td className="is-vcentered is-expanded">
      <p
        className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
      >
        {todo.title}
      </p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={() => handleEditItem(todo.id)}
      >
        <span className="icon">
          <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
        </span>
      </button>
    </td>
  </tr>
);
