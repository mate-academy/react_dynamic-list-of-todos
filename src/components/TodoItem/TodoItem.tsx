import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../Context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const {
    selectedTodo,
    setSelectedTodo,
    showModal,
    setShowModal,
  } = useContext(TodosContext);

  const selectTodo = () => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  return (
    <>
      <tr
        data-cy="todo"
        className={cn({
          'has-background-info-light': selectedTodo === todo && showModal,
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
          <p
            className={cn({
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
            onClick={() => selectTodo()}
          >
            <span className="icon">
              <i className={`far ${selectedTodo === todo && showModal ? (
                'fa-eye-slash'
              ) : ('fa-eye')}`}
              />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
