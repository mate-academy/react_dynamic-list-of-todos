import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

type Props = {
  todoId: number,
  todos: Todo[],
  setTodoId: (id: number) => void,
};

export const TodoModal: React.FC<Props> = ({ todoId, todos, setTodoId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const { completed, title } = todo || {};

  const getSelectedTodo = (id: number) => {
    const selectedTodo = todos.find(chosenTodo => chosenTodo.id === id);

    return selectedTodo || null;
  };

  const loadData = async () => {
    const currentTodo = getSelectedTodo(todoId);

    if (currentTodo) {
      const currentUser = await getUser(currentTodo.userId);

      setTodo(currentTodo);
      setUser(currentUser);
      setLoading(false);
    };
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoId]);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todoId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
