import React from 'react';
import './TodoList.scss';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodoListType } from '../../react-app-env';

export const TodoList: React.FC<TodoListType> = ({
  todos,
  selectId,
  activeUser,
  changeCompleted,
  filtered,
  selectFilter,
}) => {
  const filteredUsers = () => {
    return [...todos].filter(todo => {
      switch (selectFilter) {
        case 'completedTodos':
          return todo.completed;
        case 'notCompletedTodos':
          return !todo.completed;
        default:
          return todo;
      }
    }).filter(todo => todo.title.includes(filtered));
  };

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredUsers().map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectId={selectId}
              activeUser={activeUser}
              changeCompleted={changeCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
