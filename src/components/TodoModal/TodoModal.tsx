import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { Todo, User } from '../../types/index';

type Props = {
  selectedTodo: Todo | null;
  handleTodoSelect: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleTodoSelect,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (selectedTodo !== null) {
        setIsLoading(true);
        setUser(null);
        setTodo(null);
        const p1 = getUser(selectedTodo.userId);
        const p2 = getTodos();

        Promise.all([p1, p2])
          .then(([userData, todosData]) => {
            setUser(userData);
            const findTodo = todosData.find(
              todoData => todoData.id === selectedTodo.id,
            );

            if (findTodo !== undefined) {
              setTodo(findTodo);
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedTodo]);

  return (
    <>
      {isLoading ?? (
        <Loader />
      )}
      { (user && todo) && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoading ?? (
            <Loader />
          )}
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setUser(null);
                  setTodo(null);
                  handleTodoSelect(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
