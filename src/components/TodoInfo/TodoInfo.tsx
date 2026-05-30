import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
  setIsModalOpen,
}) => {
  function handleSelectButton() {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }

  return (
    <tr data-cy="todo" className="" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon">
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
          onClick={handleSelectButton}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': selectedTodo?.id !== todo.id || !selectedTodo,
                'fa-eye-slash': selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
