import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { ModalCard } from '../ModalCard';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { getUser } from '../../api';

type Props = {
  userId: number,
  todo: Todo | null,
  onSelectUser: (id: number) => void,
  onSelectTodo: (todo: null) => void,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  todo,
  onSelectUser,
  onSelectTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId === 0) {
      return;
    }

    const fetchData = async () => {
      await getUser(userId)
        .then(response => setUser(response));
    };

    fetchData();
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user && todo ? (
        <ModalCard
          user={user}
          todo={todo}
          onSelectUser={onSelectUser}
          onSelectTodo={onSelectTodo}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};
