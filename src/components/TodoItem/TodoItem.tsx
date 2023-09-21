import { FC, useContext } from 'react';
import cn from 'classnames';

import { TodoContext } from '../../context/ContextTodo';

import { Todo } from '../../types/Todo';

type TTodoItemProps = {
  todo: Todo;
};

export const TodoItem: FC<TTodoItemProps> = ({ todo }) => {
  const { id, title, completed } = todo;

  const {
    setIsModalOpen,
    setSelectedTodo,
    selectedTodo,
  } = useContext(TodoContext);

  const handleSelectTodo = (chosenTodo: Todo) => {
    setSelectedTodo(chosenTodo);
    setIsModalOpen(true);
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <i className="fas fa-check" data-cy="iconCompleted" />
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
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
          onClick={() => handleSelectTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': selectedTodo?.id !== id,
                'fa-eye-slash': selectedTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
