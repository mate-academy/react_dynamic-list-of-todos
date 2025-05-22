import React, { useEffect } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  filter: 'all' | 'active' | 'completed';
  todos: Todo[];
  query: string;
  openModalId: number | null;
  setIsLoading: (value: boolean) => void;
  setTodos: (value: Todo[]) => void;
  handleOpenModal: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  filter,
  todos,
  query,
  openModalId,
  setIsLoading,
  setTodos,
  handleOpenModal,
}) => {
  const filteredTodos = todos
    .filter(todo => {
      switch (filter) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
      }
    })
    .filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {filteredTodos.map(todo => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
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
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleOpenModal(todo)}
                >
                  {openModalId === todo.id ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
