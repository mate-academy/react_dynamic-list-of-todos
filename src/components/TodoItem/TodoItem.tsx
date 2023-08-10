import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    setIsTodoModal,
    setModalId,
    setSelectedTodo,
    selectedTodo,
  } = useContext(TodosContext);

  const handleButtonClick = () => {
    setIsTodoModal(true);
    setSelectedTodo(todo);
    setModalId(todo.userId);
  };

  return (
    <tr data-cy="todo" className="">
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
          className={
            todo.completed
              ? 'has-text-success'
              : 'has-text-danger'
          }
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleButtonClick}
        >
          <span className="icon">
            <i className={
              selectedTodo
                ? 'far fa-eye-slash'
                : 'far fa-eye'
            }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
