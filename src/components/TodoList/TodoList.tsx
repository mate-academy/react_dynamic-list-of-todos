import React, { useContext, useEffect } from 'react';
import { createdContext } from '../TodoContext';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  modalButton: (todo: Todo | null) => void;
  modal: Todo | null;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setLoading: (loader: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  modalButton,
  modal,
  todos,
  setTodos,
  setLoading,
}: Props) => {
  const { filterButton, searchedText } = useContext(createdContext);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(allTodos => setTodos(allTodos))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      switch (filterButton) {
        case 'All':
          return todo;
        case 'Completed':
          return todo.completed;
        case 'Active':
          return !todo.completed;
        default:
          return todo;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchedText.toLowerCase()),
    );

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
        {filteredTodos.map(filtrTodo => (
          <tr data-cy="todo" className="" key={filtrTodo.id}>
            <td className="is-vcentered">
              {filtrTodo.id}{' '}
              {!filtrTodo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p
                className={
                  filtrTodo.completed ? 'has-text-danger' : 'has-text-success'
                }
              >
                {filtrTodo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => modalButton(filtrTodo)}
              >
                <span className="icon">
                  {modal?.id === filtrTodo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
