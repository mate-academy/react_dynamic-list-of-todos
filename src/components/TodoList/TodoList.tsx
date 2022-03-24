import React from 'react';
import './TodoList.scss';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodoListType } from '../../react-app-env';

export const TodoList: React.FC<TodoListType> = ({
  todos,
  selectId,
  selectedUserId,
  changeCompleted,
  titleQuery,
  selectValue,
}) => {
  const newTodo = todos.filter(todo => {
    switch (selectValue) {
      case 'completedTodos':
        return todo.completed;
      case 'notCompletedTodos':
        return !todo.completed;
      default:
        return todo;
    }
  }).filter(todo => todo.title.includes(titleQuery));

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {newTodo.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectId={selectId}
              selectedUserId={selectedUserId}
              changeCompleted={changeCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
