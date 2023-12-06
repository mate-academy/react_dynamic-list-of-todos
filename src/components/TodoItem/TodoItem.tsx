import cn from 'classnames';
import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { StateContext } from '../Provider/Context';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const {
    selectedTodo,
    setSelectedTodo,
    setHasTodoModal,
  } = useContext(StateContext);

  const openTodoInfo = (modalTodo: Todo) => {
    setSelectedTodo(modalTodo);

    setTimeout(() => {
      setHasTodoModal(true);
    }, 100);
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': completed,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
          'has-text-danger': !completed,
          'has-text-success': completed,
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
          onClick={() => openTodoInfo(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': selectedTodo !== todo,
              'fa-eye-slash': selectedTodo === todo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
