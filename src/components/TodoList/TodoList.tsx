import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Maybe } from '../../types/Maybe';

interface Props {
  todos: Todo[];
  selectedTodoId: Maybe<number>;
  selectTodo: (todoId: Maybe<Todo>) => void;
}

export const TodoList: FC<Props> = ({ todos, selectedTodoId, selectTodo }) => (
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
      {todos.map(todo => {
        const {
          id, title, completed, userId,
        } = todo;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === id,
            })}
          >
            <td className="is-vcentered">{userId}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodoId !== id
                        ? 'far fa-eye'
                        : 'far fa-eye-slash'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
