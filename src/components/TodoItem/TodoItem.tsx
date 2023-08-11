import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const showModal = useCallback(() => {
    setModalIsOpen(prevModalIsOpen => !prevModalIsOpen);
  }, []);

  const {
    title,
    id,
    completed,
    userId,
  } = todo;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    setIsLoadingUser(true);

    getUser(userId)
      .then(userData => {
        setUser(userData);
        setIsLoadingUser(false);
      })
      .catch(() => {
        setIsLoadingUser(false);
      });
  }, [userId]);

  return (
    <>
      <tr
        data-cy="todo"
        className={classNames({ 'has-background-info-light': modalIsOpen })}
        key={id}
      >
        <td className="is-vcentered">{id}</td>
        {completed
          ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )
          : <td className="is-vcentered" />}
        <td className="is-vcentered is-expanded">
          <p className={classNames({
            'has-text-danger': !completed,
            'has-text-success': completed,
          })}
          >
            {title}
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={showModal}
          >
            <span className="icon">
              <i
                className={classNames('far',
                  {
                    'fa-eye-slash': modalIsOpen,
                    'fa-eye': !modalIsOpen,
                  })}
              />
            </span>
          </button>
        </td>
      </tr>

      {modalIsOpen && user
        && (
          <TodoModal
            todo={todo}
            toggleModal={setModalIsOpen}
            user={user}
            isLoadingUser={isLoadingUser}
          />
        )}
    </>
  );
};
