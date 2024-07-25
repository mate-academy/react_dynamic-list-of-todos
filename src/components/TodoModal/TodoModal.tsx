import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { SelectedTodo } from '../../App';
import { Todo } from '../../types/Todo';

type Props = {
  toggleModal: (todoId: number, userId: number) => void;
  selectedTodo: SelectedTodo;
  todoList: Todo[];
};

export const TodoModal: React.FC<Props> = React.memo(
  ({ toggleModal, selectedTodo, todoList }) => {
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);

    const { currentTodoId, currentUserId } = selectedTodo;
    const currentTodo = todoList.find(todo => todo.id === currentTodoId);

    useEffect(() => {
      if (currentUserId !== 0) {
        setIsLoading(true);
        getUser(currentUserId).then(data => {
          setUser(data);
          setIsLoading(false);
        });
      }
    }, [currentUserId]);

    TodoModal.displayName = 'TodoModal';

    return (
      <div className="modal is-active" data-cy="modal">
        <div
          className="modal-background"
          onClick={() => toggleModal(currentTodoId, currentUserId)}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{currentTodoId}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => toggleModal(currentTodoId, currentUserId)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    currentTodo?.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {currentTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
