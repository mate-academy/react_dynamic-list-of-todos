import classNames from 'classnames';
import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoContext';

type TodoElementProps = {
  todo: Todo;
};

export const TodoItems:React.FC<TodoElementProps> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        <i className={classNames({ 'fas fa-check': todo.completed })} />
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
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
            setSelectedTodo(todo);
          }}
        >
          <span className="icon">
            <i className={classNames('far fa-eye',
              {
                'fa-eye-slash': selectedTodo?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
