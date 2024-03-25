import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
// import { TodosContext } from '../../App';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useTodos } from '../../utils/TodosContext';

export const TodoModal: React.FC = () => {
  // const { selectedTodoId, todos, setSelectedTodoId } = useContext(TodosContext);

  const { todos, selectedTodoId, setSelectedTodoId } = useTodos();

  const [user, setUser] = useState<User | undefined>();

  const todo = todos.find(item => item.id === selectedTodoId) as Todo;

  useEffect(() => {
    getUser(todo.userId).then(data => setUser(data));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
