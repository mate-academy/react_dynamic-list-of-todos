/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedUser: User,
  isModalLoaded: boolean,
  setSelectedTodo: (param: number) => void,
  setSelectedUser: (param: User) => void,
  setIsModalLoaded: (param: boolean) => void,
  todoList: Todo[],
  selectedTodoId: number,
  setSelectedTodoId: (param: number) => void,
};
  
export const TodoModal: React.FC<Props> = (
  {
    selectedUser, isModalLoaded, setSelectedTodo,
    setSelectedUser, setIsModalLoaded, todoList,
    selectedTodoId, setSelectedTodoId,
  },
) => {
  const currentTodo = todoList.find(todo => todo.id === selectedTodoId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isModalLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(0);
                setSelectedTodoId(0);
                setSelectedUser({
                  id: 0,
                  name: '',
                  email: '',
                  phone: '',
                });
                setIsModalLoaded(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo && currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={selectedUser.email}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
