import classNames from 'classnames';
import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProp {
  todos: Todo[];
  chooseTodoHandler: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: FC<TodoListProp> = memo(
  ({
    todos,
    chooseTodoHandler,
    selectedTodo,
  }) => (
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
        {todos.map(({
          userId, id, title, completed,
        }) => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': id === selectedTodo?.id,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => chooseTodoHandler({
                  userId, id, title, completed,
                })}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'far fa-eye-slash': id === selectedTodo?.id,
                    'far fa-eye': id !== selectedTodo?.id,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
);
