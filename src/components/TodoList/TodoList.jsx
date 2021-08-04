import React from 'react';
import { Todo } from './Todo/Todo';
import './TodoList.scss';

export const TodoList = ({ state, setSelectedUserId }) => {
  const { todos, selectedUserId } = state;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li>
              <Todo
                todo={todo}
                setSelectedUserId={setSelectedUserId}
                selectedUserId={selectedUserId}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
