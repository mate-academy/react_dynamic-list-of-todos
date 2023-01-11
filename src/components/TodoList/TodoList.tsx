import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo
  setTodo: (todo: Todo) => void
  setUserId: (userId: number) => void
};

export const TodoList: FC<Props> = ({
  todos,
  selectedTodo,
  setTodo,
  setUserId,
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
        {todos.map(todo => {
          const {
            id,
            title,
            completed,
            userId,
          } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': id === selectedTodo.id,
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
                <p className={`has-text-${completed
                  ? 'success'
                  : 'danger'}`}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setTodo(todo);
                    setUserId(userId);
                  }}
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${selectedTodo.id === id
                        ? '-slash'
                        : ''}`}
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
};
