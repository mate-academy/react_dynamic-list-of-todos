import React, { useState } from 'react';
import { TodoListComponent } from '../../types/TodoListComponent';
import { TodoModal } from '../TodoModal';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC<TodoListComponent> = ({ todoList }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          {todoList.map(todo => (
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
                  className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handleClickModal(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    {selectedTodo?.id === todo.id && isModalOpen ? (
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
      {isModalOpen && (
        <TodoModal onClose={handleCloseModal} todo={selectedTodo} />
      )}
    </>
  );
};
