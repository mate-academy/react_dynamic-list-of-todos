import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoModal } from '../TodoModal';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleModalLoading = (todo: Todo) => {
    setModalLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setModalLoading(false));
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
          {todos.map((todo) => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames(
                {'has-background-info-light': selectedTodo?.id === todo.id})}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
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
                  onClick={() => handleModalLoading(todo)}
                >
                  <span className="icon">
                    <i className={selectedTodo?.id === todo.id ? 'fas fa-eye-slash' : 'far fa-eye'} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          isLoading={modalLoading}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
