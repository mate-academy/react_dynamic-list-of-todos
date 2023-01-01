import { FC } from 'react';

import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  visibleTodos: Todo[];
  handleSelectButtonClick: (id: number) => void;
  selectedButton: number | null;
}

export const TodoList: FC<Props> = ({
  visibleTodos,
  handleSelectButtonClick,
  selectedButton,
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
        {
          visibleTodos.map(({
            id,
            title,
            completed,
          }) => (
            <tr
              data-cy="todo"
              key={title}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {
                  completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )
                }
              </td>
              <td className="is-vcentered isexpanded">
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
                  onClick={() => handleSelectButtonClick(id)}
                >
                  <span className="icon">
                    <i className={cn(
                      'far',
                      {
                        'fa-eye': id !== selectedButton,
                        'fa-eye-slash': id === selectedButton,
                      },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
