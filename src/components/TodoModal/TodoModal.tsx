import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  id: number;
  user: User | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ id, onClose }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    const todoItem = todos.find(todo => todo.id === id);

    setSelectedTodo(todoItem || null);

    if (todoItem) {
      setLoading(true);
      getUser(todoItem.userId)
        .then(fetchedUser => {
          setUser(fetchedUser);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [todos, id]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo.id}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    selectedTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                {user ? (
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                ) : (
                  'User not foun'
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
