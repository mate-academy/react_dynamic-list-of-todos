import { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  userId: number | null,
  selectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = memo((
  {
    todos,
    userId,
    selectedTodo,
  },
) => {
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
          } = todo;

          const isSelected = userId === id;

          return (
            <tr key={id} data-cy="todo" className="">
              <td className="is-vcentered">{id}</td>
              {
                !completed
                  ? <td className="is-vcentered" />
                  : (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  )
              }

              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
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
                  onClick={() => {
                    selectedTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye-slash': isSelected,
                      'fa-eye': !isSelected,
                    })}
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
});
