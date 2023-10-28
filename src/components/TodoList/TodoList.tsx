import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = (
  { todo, selectedTodo, setSelectedTodo },
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
        {todo.map(t => (
          <tr
            data-cy="todo"
            key={t.id}
            className={t === selectedTodo && t !== null
              ? 'has-background-info-light'
              : ''}
          >
            <td className="is-vcentered">{t.id}</td>
            {t.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p className={t.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {t.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(t)}
              >
                <span className="icon">
                  <i className={t === selectedTodo
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
