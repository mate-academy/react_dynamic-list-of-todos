//import { getTodos } from '../../api';
//import { todo } from 'node:test';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
//import { Loader } from '../Loader/Loader';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onShow }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo">
            {/* ID */}
            <td className="is-vcentered">{todo.id}</td>

            {/* Status */}
            <td
              className={cn('is-vcentered', {
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
              data-cy="todo-status"
            >
              {todo.completed ? (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <span className="icon">
                  <i className="fas fa-times" />
                </span>
              )}
            </td>

            {/* Título */}
            <td
              className={cn('is-vcentered is-expanded', {
                'has-text-success line-through': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </td>

            {/* Botão de abrir modal */}
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onShow(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
