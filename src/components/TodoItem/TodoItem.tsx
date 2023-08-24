import classNames from 'classnames';
import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodosContext);

  const isTodoSelected = todo.id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isTodoSelected,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={todo.completed ? 'has-text-success' : 'has-text-danger'}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={`far ${isTodoSelected ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
