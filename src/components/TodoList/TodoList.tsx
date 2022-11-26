import { FC } from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProp {
  todos: Todo[];
  chooseTodoHandler: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: FC<TodoListProp> = ({
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
          className={id === selectedTodo?.id
            ? 'has-background-info-light'
            : ''}
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
              className={completed
                ? 'has-text-success'
                : 'has-text-danger'}
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
                <i className={id === selectedTodo?.id
                  ? 'far fa-eye-slash'
                  : 'far fa-eye'}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
