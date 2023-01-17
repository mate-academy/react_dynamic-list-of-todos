import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  onSelect: (id: number) => void,
  selectedId: number,
}

export const TodoList: FC<Props> = memo(
  ({ todos, onSelect, selectedId }) => (
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

        {
          todos.map(({ id, title, completed }) => (
            <tr
              key={id}
              data-cy="todo"
              className=""
            >
              <td className="is-vcentered">{id}</td>

              {
                completed
                  ? (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  )
                  : (<td className="is-vcentered" />)
              }

              <td className="is-vcentered is-expanded">
                <p
                  className={`has-text-${completed ? 'success' : 'danger'}`}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(id)}
                >
                  <span className="icon">
                    <i className={`far fa-eye${selectedId === id ? '-slash' : ''}`} />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  ),
);
