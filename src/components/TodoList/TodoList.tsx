import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  currentTodo: Todo | null,
  onTodoClick: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export const TodoList: FC<Props> = ({ todos, currentTodo, onTodoClick }) => (
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
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr
          data-cy="todo"
          className=""
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span
                className="icon"
                data-cy="iconCompleted"
              >
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={classNames({
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
              onClick={() => (
                currentTodo?.id === todo.id
                  ? onTodoClick(null)
                  : onTodoClick(todo)
              )}
            >
              <span className="icon">
                <i className={classNames('far', {
                  'fa-eye-slash': todo.id === currentTodo?.id,
                  'fa-eye': todo.id !== currentTodo?.id,
                })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
