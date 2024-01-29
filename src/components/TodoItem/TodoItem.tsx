import React, { useContext } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../TodoContext/TodoContext';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { selectTodo, selectedTodo } = useContext(TodoContext);

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{item.id}</td>
      <td className="is-vcentered">
        {item.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !item.completed,
            'has-text-success': item.completed,
          })}
        >
          {item.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => selectTodo(item)}
        >
          <span className="icon">
            <i className={cn({
              'far fa-eye-slash': selectedTodo?.id === item.id,
              'far fa-eye': selectedTodo?.id !== item.id,
            })}
            />

          </span>
        </button>
      </td>
    </tr>
  );
};

// eslint-disable-next-line no-lone-blocks
{
  /* <tr data-cy="todo" className="">
  <td className="is-vcentered">8</td>
  <td className="is-vcentered">
    <span className="icon" data-cy="iconCompleted">
      <i className="fas fa-check" />
    </span>
  </td>
  <td className="is-vcentered is-expanded">
    <p className="has-text-success">quo adipisci enim quam ut ab</p>
  </td>
  <td className="has-text-right is-vcentered">
    <button data-cy="selectButton" className="button" type="button">
      <span className="icon">
        <i className="far fa-eye" />
      </span>
    </button>
  </td>
</tr> */
}
