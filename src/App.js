import React from 'react';
import './App.css';
import { fetchTodosAndUsers } from './apiFetch';
import TodoList from './TodoList';

const App = () => {
  const todoWithUsers = async() => {
    const [users,todos] = await fetchTodosAndUsers();

    return todos.map(todo => ({
      ...todo,
      user:users.find(user => user.id === todo.userId)
    }))
  }

  return (
    <div className="App">
      <h1 className="title">Dynamic list of todos</h1>
      <TodoList getTodos={todoWithUsers} />
    </div>
  );
};

export default App;
