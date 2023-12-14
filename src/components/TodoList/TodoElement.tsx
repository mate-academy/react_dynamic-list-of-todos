// eslint-disable-next-line import/no-cycle
import { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext';

interface TodoElementProps {
  todo: Todo;
}

export const TodoElement:React.FC<TodoElementProps> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const isSelectedTodo = selectedTodo?.id === todo.id;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        <i className={cn('', { 'fas fa-check': todo.completed })} />
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn('', {
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
          <span
            className="icon"
            data-cy={cn('', { iconCompleted: todo.completed })}
          >
            <i className={cn('far',
              {
                'fa-eye-slash': isSelectedTodo,
                'fa-eye': !isSelectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
