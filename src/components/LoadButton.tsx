import React from 'react';
import { todosFromServer, userFromServer } from '../api';

const LoadButton: React.FC<ButtonProps> = ({ beforeLoaded, afterLoaded }) => {
  const getTodosWithUsers = async () => {
    beforeLoaded();
    const users: Users[] = await userFromServer();
    const todos: Todos[] = await todosFromServer();

    const list: TodosWithUsers[] = todos.map(todo => {
      return {
        user: users.find(user => user.id === todo.userId)?.name,
        title: todo.title,
        complete: todo.completed,
        id: todo.id,
      };
    });

    afterLoaded(list);
  };

  return (
    <div>
      <button
        className="load__button"
        type="button"
        onClick={getTodosWithUsers}
      >
        Load
      </button>
    </div>
  );
};

export default LoadButton;
