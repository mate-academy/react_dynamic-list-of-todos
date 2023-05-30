import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { TodoModalList } from './TodoModalList';
import { getUser } from '../../api';

interface PropsUser {
  todos: Todo[];
  isModalClosed: (event: boolean) => void;
  clickedValue: number;
}

export const TodoModal: React.FC<PropsUser> = (
  { todos, isModalClosed, clickedValue },
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [combineData, setCombineData] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await getUser(clickedValue);

      setUsers([userData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updatedUsers = users.map((user) => {
      const findData = todos.find((todo) => todo.id === clickedValue);

      return {
        ...user,
        more: findData ? [findData] : [],
      };
    });

    setCombineData(updatedUsers);
  }, [users, todos, clickedValue]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {users.length === 0 ? (
        <Loader />
      ) : (
        combineData.map((user) => (
          <TodoModalList
            user={user}
            isModalClosed={isModalClosed}
            key={user.id}
          />
        ))
      )}
    </div>
  );
};
