import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: (id: number) => void;
  selectedTodoId: number;
  selectedStatus: string;
  selectedQuery: string;
};

export const TodoList: React.FC<Props> = ({
  todos, selectTodo, selectedTodoId, selectedStatus, selectedQuery,
}) => {
  const searchedTodos = todos.filter(
    (todo) => todo.title.toLowerCase().includes(selectedQuery.toLowerCase()),
  );

  const filteredTodos = searchedTodos.filter((todo) => {
    switch (selectedStatus) {
      case 'active':
        return todo.completed === false;

      case 'completed':
        return todo.completed === true;

      case 'all':
      default:
        return true;
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
          {filteredTodos.map((todo) => (
            <>
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames(
                    'has-text-success',
                    { 'has-text-danger': !todo.completed },
                  )}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  {selectedTodoId === todo.id
                    ? (
                      <button
                        data-cy="selectButton"
                        className="button is-link"
                        type="button"
                        onClick={() => selectTodo(0)}
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
                        onClick={() => selectTodo(todo.id)}
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
