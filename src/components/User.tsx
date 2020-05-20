import React from 'react';

import { Todos } from '../api/api';

type Props = {
  todo: Todos;
}

const User: React.FC<Props> = ({ todo }) => (
  <div>
    <span className="todo_user-text">Users name: &nbsp;</span>
    {todo.user ? todo.user.name : ''}
  </div>
);

export default User;

/*import React from 'react';
import User from './User';

import {Todos} from '../api/api';

type Props = {
  todos: Todos[];
}

const TodoItem: React.FC<Props> = ({ todos }) => (
  <li className={
    todos.completed
      ? 'todo_item todo_item-done'
      : 'todo_item'
  }
  >
    <User user={todos.user} />
    <div>
      <span className="todo_title-text">
        Todos: &nbsp;
      </span>
      {todos.title}
    </div>
    <div className="todo_status">
      {todos.completed
        ? 'True'
        : 'False'}
    </div>
  </li>
);

export default TodoItem;*/

/*import React from 'react';
import TodoItem from './TodoItem';

import { Todos } from '../api/api';

type Props = {
  todoList: Todos[];
}

const TodoList: React.FC<Props> = ({ todoList }) => (
  <>
    <h1>Static list of todos</h1>
    <ul className="todo_list">
     {todoList.map(todo => (
        <TodoItem todos={todo} key={todo.id} />
      ))}
    </ul>
  </>
);

export default TodoList;*/
