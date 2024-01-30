import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { TodosContext } from '../../contexts/TodoProvider';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const { selectedTodo, selectTodo } = useContext(TodosContext);
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const { title, completed, id: todoId } = selectedTodo;

  useEffect(() => {
    getUser(selectedTodo.userId).then(setTodoOwner);
  }, []);

  const handleModalClosed = () => {
    selectTodo(null as unknown as Todo);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoOwner ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleModalClosed}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${todoOwner.email}`}>
                {todoOwner.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
