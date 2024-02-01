import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    selectedTodo,
    setSelectedTodo,
  } = useContext(TodosContext);

  const {
    id,
    title,
    completed,
  } = todo;

  const handleOnClick = () => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <tr
        data-cy="todo"
        className={classNames({
          'has-background-info-light': selectedTodo?.id === id,
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
            className={classNames({
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
            onClick={handleOnClick}
          >
            <span className="icon">
              <i
                className={classNames('far', {
                  'fa-eye': selectedTodo?.id !== id,
                  'fa-eye-slash': selectedTodo?.id === id,
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
