import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: (id: number | null) => void;
  selectedTodoId: number | null;
  selectedStatus: string;
  selectedQuery: string;
};

export const TodoList: React.FC<Props> = ({
  todos, selectTodo, selectedTodoId, selectedStatus, selectedQuery,
}) => {
  const handleQueryInclude = (text: string, searchQuery: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredTodos = todos.filter(({ completed, title }) => {
    switch (selectedStatus) {
      case 'active':
        return !completed
        && handleQueryInclude(title, selectedQuery);

      case 'completed':
        return completed === true
        && handleQueryInclude(title, selectedQuery);

      case 'all':
      default:
        return true
        && handleQueryInclude(title, selectedQuery);
    }
  });

  return (
    <>
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
          {filteredTodos.map(({ id, completed, title }) => (
            <>
              <tr data-cy="todo" className="" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames(
                    'has-text-success',
                    { 'has-text-danger': !completed },
                  )}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  {selectedTodoId === id
                    ? (
                      <button
                        data-cy="selectButton"
                        className="button is-link"
                        type="button"
                        onClick={() => selectTodo(null)}
                      >
                        <span className="icon">
                          <i className="far fa-eye-slash" />
                        </span>
                      </button>
                    )
                    : (
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => selectTodo(id)}
                      >
                        <span className="icon">
                          <i className="far fa-eye" />
                        </span>
                      </button>
                    )}

                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
