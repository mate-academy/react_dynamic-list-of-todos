import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null | undefined;
  chooseTodo: (Todo:Todo) => void;
};

export const TodoList: FC<Props> = ({ todos, chooseTodo }) => {
  return (
    <table
      data-cy="listOfTodos"
      className="table is-narrow is-fullwidth"
    >
      <tbody>
        {todos?.map((todo) => {
          return (
            <tr
              key={todo.id}
              className={todo.completed
                ? 'has-background-success-light has-text-success'
                : 'has-background-danger-light has-text-danger'}
            >
              <td className="is-vcentered">
                <span className="icon is-size-5">
                  <i className={todo.completed
                    ? 'fas fa-check-square'
                    : 'fas fa-square-xmark'}
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
                  onClick={() => chooseTodo(todo)}
                >
                  Show &nbsp;#
                  {todo.id}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// has-background-danger-light has-text-danger  has-background-danger-light has-text-danger fas fa-square-xmark
