import React, { useState, FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getData } from './api/api';
import './App.css';
import { Todo } from './interfaces/TodoInterface';
import { User } from './interfaces/UserInterface';
import { TodoList } from './components/TodoList/TodoList';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [completedCounter, setCompletedCounter] = useState(0);
  const [titleCounter, setTitleCounter] = useState(0);
  const [userCounter, setUserCounter] = useState(0);

  const loadData = async () => {
    setLoading(true);

    const allTodos = await getData<Todo>('todos');
    const allUsers = await getData<User>('users');

    setTodos(allTodos.map((todo) => ({
      ...todo,
      user: allUsers.find(user => user.id === todo.userId),
    })));

    setLoading(false);
  };

  const sortCompleted = () => {
    if (completedCounter % 2 === 0) {
      setTodos([...todos].sort((a, b) => {
        return Number(a.completed) - Number(b.completed);
      }));
    } else {
      setTodos([...todos].sort((a, b) => {
        return Number(b.completed) - Number(a.completed);
      }));
    }

    setCompletedCounter(completedCounter + 1);
  };

  const sortByTitle = () => {
    if (titleCounter % 2 === 0) {
      setTodos([...todos].sort((a, b) => {
        return a.title.localeCompare(b.title);
      }));
    } else {
      setTodos([...todos].sort((a, b) => {
        return b.title.localeCompare(a.title);
      }));
    }

    setTitleCounter(titleCounter + 1);
  };

  const sortByUser = () => {
    if (userCounter % 2 === 0) {
      setTodos([...todos].sort((a: any, b: any) => {
        if (a.user && b.user) {
          return a.user.name.localeCompare(b.user.name);
        }

        return '';
      }));
    } else {
      setTodos([...todos].sort((a: any, b: any) => {
        if (b.user && a.user) {
          return b.user.name.localeCompare(a.user.name);
        }

        return '';
      }));
    }

    setUserCounter(userCounter + 1);
  };

  if (isLoading) {
    return (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <button
        type="button"
        className="loading__button btn btn-success"
        onClick={loadData}
      >
        Load todos
      </button>
    );
  }

  return (
    <div className="wrapper">
      <TodoList
        todos={todos}
        sortCompleted={sortCompleted}
        sortByTitle={sortByTitle}
        sortByUser={sortByUser}
      />
    </div>
  );
};

export default App;
