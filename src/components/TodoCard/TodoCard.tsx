import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  selectTodo: (todo: Todo) => void;
  showModalWindow: (show: boolean) => void;
  isShowModal: boolean;
  selectedTodo: Todo | null;
};

const TodoCard: React.FC<Props> = ({
  todo,
  selectTodo,
  showModalWindow,
  isShowModal,
  selectedTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn(
        selectedTodo?.id === todo?.id && isShowModal
          ? 'has-background-info-light'
          : '',
      )}
    >
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
          className={cn({
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
          onClick={() => {
            selectTodo(todo);
            showModalWindow(true);
          }}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': selectedTodo?.id !== todo.id,
                'fa-eye-slash': selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoCard;
