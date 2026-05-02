import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  isTodoLoaded: boolean;
  isOpenTodo: boolean;
  setIsTodoLoaded: (isTodoLoaded: boolean) => void;
  setIsOpenTodo: (isOpenTodo: boolean) => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (selectedTodoId: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  isTodoLoaded,
  isOpenTodo,
  setIsOpenTodo,
  setIsTodoLoaded,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const [visibleUser, setVisibleUser] = useState<User | null>(null);
  const visibleTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    if (!isOpenTodo || !visibleTodo) {
      setVisibleUser(null);

      return;
    }

    setIsTodoLoaded(false);
    setVisibleUser(null);

    let isCancelled = false;

    getUser(visibleTodo.userId).then(user => {
      if (isCancelled) {
        return;
      }

      setVisibleUser(user);
      setIsTodoLoaded(true);
    });

    return () => {
      isCancelled = true;
    };
  }, [isOpenTodo, setIsTodoLoaded, visibleTodo]);

  return isOpenTodo ? (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => {
          setIsOpenTodo(false);
          setIsTodoLoaded(false);
          setSelectedTodoId(null);
        }}
      />

      {!isTodoLoaded ? (
        <Loader isLoaded={isTodoLoaded} />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{visibleTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setIsOpenTodo(false);
                setIsTodoLoaded(false);
                setSelectedTodoId(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {visibleTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': visibleTodo?.completed,
                  'has-text-danger': !visibleTodo?.completed,
                })}
              >
                {visibleTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${visibleUser?.email}`}>{visibleUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  ) : (
    ''
  );
};
