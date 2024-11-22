import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoModal } from '../TodoModal';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodoId(todo.id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
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
        {todos.map(todo => (
          <tr data-cy="todo" key={todo.id}>
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
                className={classNames({
                  'has-text-danger': todo.completed === false,
                  'has-text-success': todo.completed === true,
                })}
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
                <span className="icon">
                  {selectedTodoId === todo.id ? (
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

      {selectedTodoId && (
        <TodoModal
          onClose={handleCloseModal}
          todo={todos.find(todo => todo.id === selectedTodoId)!}
        />
      )}
    </table>
  );
};
