import cn from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  onTodoSelect: (todoId: number) => void,
};

export const TodoList: FC<Props> = ({
  todos,
  selectedTodoId,
  onTodoSelect,
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
      {todos.map(({ id, title, completed }) => (
        <tr
          data-cy="todo"
          className=""
          key={id}
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
              className={cn({
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
              onClick={() => onTodoSelect(id)}
            >
              <span className="icon">
                <i
                  // className="far fa-eye"
                  className={cn(
                    'far',
                    { 'fa-eye': id !== selectedTodoId },
                    { 'fa-eye-slash': id === selectedTodoId },
                  )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
