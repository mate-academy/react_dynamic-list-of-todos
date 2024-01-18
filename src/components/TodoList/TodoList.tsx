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
            'has-background-info-light': selected?.id === id,
          })}
        >
          <td className="is-vcentered">{id}</td>
          {completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p className={classNames({
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
              onClick={() => onSelected({
                id,
                title,
                completed,
                userId,
              })}
            >
              <span className="icon">
                <i className={classNames('far', {
                  'fa-eye': selected?.id !== id,
                  'fa-eye-slash': selected?.id === id,
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
