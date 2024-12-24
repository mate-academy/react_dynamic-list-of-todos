import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  setModal: (value: boolean) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setModal,
  selectedTodo,
  setSelectedTodo,
}) => {
  const modalClick = () => {
    setModal(true);
    setSelectedTodo(todo);
  };

  const{id, title, completed} = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={modalClick}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': id === selectedTodo?.id,
                'fa-eye': id !== selectedTodo?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
