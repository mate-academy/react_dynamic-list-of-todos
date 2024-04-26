import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleShowModal: (todo: Todo) => void;
  filterStatus: 'all' | 'active' | 'completed';
  filterTitle: string;
  modalOpen: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleShowModal,
  filterStatus,
  filterTitle,
}) => {
  const filteredTodos = todos.filter(todo => {
    const titleFit = filterTitle
      ? todo.title.toLowerCase().includes(filterTitle.toLowerCase())
      : true;

    return (
      (filterStatus === 'all' ||
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed)) &&
      titleFit
    );
  });

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
        {filteredTodos.map((todo, index) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.completed ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                {todo.completed && <i className="fas fa-check" />}
              </span>
            </td>
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
                onClick={() => handleShowModal(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
