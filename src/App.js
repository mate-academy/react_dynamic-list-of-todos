import React from 'react';
import './App.css';
import {todos} from './api/todos';
import {users} from './api/users';

function getUser(userId) {
  return users.find(user => user.id === userId);
}

const todosWithUser = todos.map((todo) => {
  return {
    ...todo,
    user: getUser(todo.userId)
  };
});

const App = () => (
<div className="App">
  <h1>Static list of todos Roman's</h1>      
  <TodoList todos={todosWithUser} />
</div>
); 

const TodoList = (props) => (
  <ul>
    {props.todos.map(todo => (
      <TodoItem todo={todo} />
    ))}
  </ul>
);

const TodoItem = (props) => (
  <li>
    <label>
      <input type="checkbox" checked={props.todo.completed} />
        {props.todo.title}
    </label>
    <User user={props.todo.user}/>
  </li>
);

const User = (props) => (
  <div>
    {props.user.name}
  </div>
);

export default App;
