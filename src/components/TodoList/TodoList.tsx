import { FC } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  onSelect: (selectedTodo: Todo | null) => void,
};

export const TodoList: FC<Props> = (props) => {
  const {
    todos,
    selectedTodo,
    onSelect,
  } = props;

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
        {todos.map((todo) => {
          const {
            id,
            title,
            completed,
          } = todo;

          const isSelectedTodo = selectedTodo?.id === id;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                {
                  'has-background-info-light': isSelectedTodo,
                },
              )}
              key={id}
            >
              <td className="is-vcentered">
                {id}
              </td>

              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
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
                  onClick={() => {
                    onSelect(todo);
                  }}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far', {
                        'fa-eye': !isSelectedTodo,
                        'fa-eye-slash': isSelectedTodo,
                      },
                    )}
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
