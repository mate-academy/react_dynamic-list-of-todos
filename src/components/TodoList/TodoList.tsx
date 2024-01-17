import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selected: Todo | null,
  onSelected: (todo: Todo | null) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selected,
  onSelected,
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames({
            'has-background-info-light': selected?.id === todo.id,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p className={`${todo.completed
              ? 'has-text-success'
              : 'has-text-danger'
            }`}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelected(todo)}
            >
              <span className="icon">
                <i className={classNames('far', {
                  'fa-eye': selected?.id !== todo.id,
                  'fa-eye-slash': selected?.id === todo.id,
                })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}

    </tbody>
  </table>
);
