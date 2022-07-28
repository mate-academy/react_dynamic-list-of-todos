import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setSelectedTodo(todo: Todo): void,
};

export const TodoList: FC<Props> = ({
  todos,
  setSelectedTodo,
}) => (
  <table
    data-cy="listOfTodos"
    className="table is-narrow is-fullwidth"
  >
    <tbody>
      {todos.map(todo => (
        <tr
          key={todo.id}
          className={classNames(
            { 'has-background-danger-light has-text-danger': !todo.completed },
            { 'has-background-success-light has-text-success': todo.completed },
          )}
        >
          <td className="is-vcentered">
            <span className="icon is-size-5">
              <i className={classNames(
                'fas',
                { 'fa-square-xmark': !todo.completed },
                { 'fa-check-square': todo.completed },
              )}
              />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            {todo.title}
          </td>
          <td className="has-text-right is-vcentered">
            <button
              className="button is-warning"
              type="button"
              onClick={() => {
                setSelectedTodo(todo);
              }}
            >
              {`Show #${todo.id}`}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
