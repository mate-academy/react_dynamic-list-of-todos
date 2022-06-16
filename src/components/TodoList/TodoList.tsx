import React from 'react';
import './TodoList.scss';
import { Todo } from '../Todo';

type Props = {
  todos: Todo[];
  changeUser: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, changeUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <Todo
            todo={todo}
            changeUser={changeUser}
          />
        ))}
      </ul>
    </div>
  </div>
);
