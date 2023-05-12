import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId?: number;
  onSelectedTodo: (todo: Todo) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectedTodo,
}) => {
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
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(({
          id,
          title,
          completed,
          userId,
        }) => (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === id,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) }
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-danger': !completed,
                'has-text-success': completed,
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
                onClick={() => onSelectedTodo({
                  id,
                  title,
                  completed,
                  userId,
                })}
              >
                <span className="icon">
                  {selectedTodoId === id
                    ? <i className="far fa-eye-slash" />
                    : <i className="far fa-eye" />}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
