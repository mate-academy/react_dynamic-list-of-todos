import classNames from 'classnames';
import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodosContext';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const { setShow, setSelectedTodo, selectedTodo } = useContext(TodosContext);

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
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={() => {
            setShow(true);
            setSelectedTodo(todo);
          }}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={classNames('far',
              { 'fa-eye-slash': selectedTodo.id === todo.id },
              { 'fa-eye': selectedTodo.id !== todo.id })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
