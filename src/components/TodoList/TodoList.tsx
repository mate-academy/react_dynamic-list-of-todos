import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // Функція для відкриття модалки
  const showModal = (todoId: number) => {
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
      setSelectedTodo(todo);
    }
  };

  // Функція для закриття модалки
  const closeModal = () => {
    setSelectedTodo(null);
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
          {todos.length === 0 ? (
            <tr>
              <td colSpan={4}>Немає доступних тудушок</td>
            </tr>
          ) : (
            todos.map(todo => (
              <tr key={todo.id} data-cy="todo">
                <td>{todo.id}</td>
                <td>
                  {todo.completed ? (
                    <span
                      className="icon has-text-success"
                      data-cy="iconCompleted"
                    >
                      <i className="fas fa-check-circle" />
                    </span>
                  ) : (
                    <span className="icon has-text-grey">
                      <i className="fas fa-circle" />
                    </span>
                  )}
                </td>

                <td>{todo.title}</td>
                <td>
                  {selectedTodo && selectedTodo.id === todo.id ? (
                    <button
                      type="button"
                      data-cy="selectButton"
                      onClick={closeModal}
                    >
                      <i className="fas fa-eye-slash" /> Hide
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="selectButton"
                      onClick={() => showModal(todo.id)}
                    >
                      <i className="fas fa-eye" /> Show
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Відображаємо модалку, якщо вибрана тудушка */}
      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
