import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filter: Todo[];
  setChosenTodo: (chosenTodo: Todo) => void,
  handleToggleModal: () => void,
  chosenTodo: Todo | null,
};

export const TodoList: React
  .FC<Props> = ({
  filter, setChosenTodo, handleToggleModal, chosenTodo,
}) => {
  const handleChosenTodo = (todo: Todo) => {
    setChosenTodo(todo);
    handleToggleModal();
  };

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
        {filter.map((todo: Todo) => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={todo.completed
                  ? 'has-text-success' : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleChosenTodo(todo)}
              >
                <span className="icon">
                  <i className={`far ${todo.id === chosenTodo?.id ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
