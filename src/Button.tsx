import React from 'react';
import { Todo, User, TodoWithUser } from './interfaces';
import { getData, URLTodos, URLUsers } from './api';

interface Props {
  beforeLoaded: () => void;
  afterLoaded: (list: TodoWithUser[]) => void;
}

export const Button: React.FC<Props> = ({ beforeLoaded, afterLoaded }) => {
  const getTodoList = async () => {
    beforeLoaded();

    const todos = await getData<Todo>(URLTodos);
    const users = await getData<User>(URLUsers);

    function findUserById(id: number) {
      return users.find(user => user.id === id)?.name;
    }

    const list: TodoWithUser[] = todos.map(todo => {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        user: findUserById(todo.userId),
      };
    });

    afterLoaded(list);
  };

  return (
    <button
      type="button"
      className="btn btn-dark ml shadow p-3 mb-5  rounded"
      onClick={getTodoList}
    >
      <i className="material-icons left" />
      Load todos
    </button>
  );
};
