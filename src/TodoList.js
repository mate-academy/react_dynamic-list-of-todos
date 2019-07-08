import React from 'react';
import TodoItem from './TodoItem';
import User from './User';
import './todoList.css';

const sortByTodoName = () => {

};

const TodoList = ({ todos, users }) => {
  const listItem = todos.map(todoItem => users.map(
    (userItem) => {
      if (userItem.id === todoItem.userId) {
        return (
          <div className="todo-list__item">
            <TodoItem key={todoItem.id} item={todoItem} />
            <User key={userItem.id} user={userItem} />
          </div>
        );
      }

      return false;
    }
  ));

  return (
    <div className="todo-list__container">
      <h1>Todos List</h1>
      <div>
        <button onClick={sortByTodoName} className="todo-list__sort-by-name" type="button">Todo name</button>
      </div>
      {listItem}
    </div>
  );
};

export default TodoList;
