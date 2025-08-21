import { use } from 'chai';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useState } from 'react';
import { title } from 'process';

type Props = {
  todo: Todo;
};

export const Todoinfo: React.FC<Props> = ({ todo, handleChoosenDataTodo }) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered is-expanded">
        {todo.completed && (
          <span className="icon">
            <i className="fas fa-check" data-cy="iconCompleted" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={cn('has-text-success', {
            'has-text-danger': !todo.completed,
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
          onClick={() => handleChoosenDataTodo(todo)}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
