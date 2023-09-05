import React, { useEffect, useState } from 'react';
import { TodoWithUser, useTodos } from '../Context';
import { TodoModal } from '../TodoModal';
import { getUser } from '../../api';

const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export const TodoList: React.FC = () => {
  const {
    modal, setModal, todosWithUser, filter, setLoadingModal,
  } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<TodoWithUser | null>(null);

  useEffect(() => {
    const fetchUserAndOpenModal = async (todo: TodoWithUser) => {
      setLoadingModal(true);
      await getUser(todo.userId);
      setSelectedTodo(todo);
      setModal(true);
      setLoadingModal(false);
    };

    if (modal && selectedTodo) {
      fetchUserAndOpenModal(selectedTodo);
    }
  }, [modal, selectedTodo]);

  const openModal = (todo: TodoWithUser) => {
    setSelectedTodo(todo);
    setModal(true);
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
          {filteredTodos().map((todo) => {
            const { id, completed, title } = todo;

            return (
              <tr data-cy="todo" className="" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                  >
                    {title}
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
                      <i className={modal
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modal && selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
