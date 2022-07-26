import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
  selectTodo: (todo: Todo)=> void;
}
export const TodoList:FC<Props> = ({ todos, selectTodo }) => (
  <table
    data-cy="listOfTodos"
    className="table is-narrow is-fullwidth"
  >
    <tbody>

      {
        todos?.map(todo => (
          <tr
            key={todo.id}
            className={
              classNames(
                'has-background-success-light',
                'has-text-success',
                {
                  'has-background-danger-light': !todo.completed,
                  'has-text-danger': !todo.completed,
                },
              )
            }
          >
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon is-size-5">
                  <i className="fas fa-check-square" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              {todo.title}
            </td>
            <td className="has-text-right is-vcentered">
              <button
                className="button is-warning"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                {`Show ${todo.id}`}
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
