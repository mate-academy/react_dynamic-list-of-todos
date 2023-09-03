import React, { useState } from 'react';
import { TodoWithUser, useTodos } from '../Context';
import { TodoModal } from '../TodoModal';

const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export const TodoList: React.FC = () => {
  const {
    modal, setModal, todosWithUser, filter, setLoadingModal,
  } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<TodoWithUser | null>(null);

  const openModal = (todo: TodoWithUser) => {
    setLoadingModal(true);
    setSelectedTodo(todo);
    setModal(true);
    setLoadingModal(false);
  };

  const filteredTodos = () => {
    switch (filter) {
      case ACTIVE_TODOS:
        return todosWithUser.filter(todo => !todo.completed);

      case COMPLETED_TODOS:
        return todosWithUser.filter(todo => todo.completed);

      default:
        return todosWithUser;
    }
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
          {filteredTodos().map((todo) => (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => openModal(todo)}
                >
                  <span className="icon" data-cy="iconCompleted">
                    <i className={modal ? 'far fa-eye-slash' : 'far fa-eye'} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
