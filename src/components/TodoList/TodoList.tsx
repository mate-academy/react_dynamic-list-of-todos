/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodoListType } from '../../react-app-env';

export const TodoList: React.FC<TodoListType> = ({
  todos,
  selectId,
  activeUser,
  changeCompleted,
  setNewFilter,
  filtered,
  selectFilter,
  setSelectFilter,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <div className="TodoList__nav">
          <input
            type="text"
            className="TodoList__input"
            placeholder="search"
            value={filtered}
            onChange={(e) => setNewFilter(e.target.value)}
          />
          <select name="select" value={selectFilter} onChange={(e) => setSelectFilter(e)}>
            <option defaultValue="allTodos">all</option>
            <option value="completedTodos">completed</option>
            <option value="notCompletedTodos">need to complete</option>
          </select>
        </div>
        <ul className="TodoList__list">
          {todos.map(todo => (
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
