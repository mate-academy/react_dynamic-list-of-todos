import {
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  setSelectedTodoId: Dispatch<SetStateAction<number>>,
};

export const TodoList: FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
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
        {todos.map(({ id, title, completed }) => {
          const isSelected = id === selectedTodoId;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isSelected,
              })}
              key={id}
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
                <p className={classNames(
                  'has-text-success',
                  {
                    'has-text-danger': !completed,
                  },
                )}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodoId(id)}
                >
                  <span className="icon">
                    <i className={isSelected
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
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
