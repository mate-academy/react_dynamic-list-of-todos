import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  id: number;
  todos: Todo[];
  onClose: (id: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({ id, todos, onClose }) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedTodo = todos.find(todo => todo.id === id);

  useEffect(() => {
    if (selectedTodo) {
      setLoading(true);
      getUser(selectedTodo.userId).then(dataFromServer => {
        setData(dataFromServer);
        setLoading(false);
      });
    }
  }, [selectedTodo?.userId, selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
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
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {!selectedTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {data?.email && data.name && (
                <a href={`mailto: ${data.email}`}>{data.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
