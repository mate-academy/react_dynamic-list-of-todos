import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getTodos, getUser } from '../../api';
import { Todo } from '../../types/Todo';

export interface TodoModalProps {
  selected: number;
  onSelected: (id: number) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selected,
  onSelected,
}) => {
  const [user, setUser] = useState<User>();
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const selectedtoDo = toDoList.find(todo => todo.id === selected) || null;

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setToDoList)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (selectedtoDo?.userId) {
      setIsLoadingUser(true);
      getUser(selectedtoDo.userId)
        .then(setUser)
        .finally(() => setIsLoadingUser(false));
    }
  }, [selectedtoDo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser || isLoadingTodos ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedtoDo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelected(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedtoDo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedtoDo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
