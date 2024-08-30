import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null;
  todo: Todo | null;
  setIsModalActive: (isModalActive: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  todo,
  setIsModalActive,
}) => {
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(true); // Змінено на true для відображення лоадера при відкритті

  const findUser = useCallback(() => {
    if (todo?.userId) {
      getUser(todo.userId)
        .then(setTodoOwner)
        .catch(error => {
          alert(error);
          setTodoOwner(null);
        })
        .finally(() => {
          setModalLoading(false);
        });
    } else {
      setModalLoading(false); // Якщо userId відсутній, зупиняємо завантаження
    }
  }, [todo?.userId]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  // Перевіряємо, чи потрібно показувати модальне вікно
  const shouldShowModal = selectedTodo !== null;

  return (
    <>
      <div
        className={classNames('modal', {
          'is-active': shouldShowModal,
        })}
        data-cy="modal"
      >
        <div className="modal-background" />

        {modalLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo?.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setIsModalActive(false)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!todo?.completed ? (
                  <strong className="has-text-danger">Planned</strong>
                ) : (
                  <strong className="has-text-success">Done</strong>
                )}
                {' by '}
                {todoOwner && (
                  <a href={`mailto:${todoOwner.email}`}>{todoOwner.name}</a>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
