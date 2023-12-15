import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { User } from './types/User';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [TodosFromServer, setAllTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(allTodos => {
      const todoPromises = allTodos.map(todo => {
        return getUser(todo.userId)
          .then(user => {
            const updatedTodo: Todo = { ...todo, user };

            return updatedTodo;
          });
      });

      Promise.all(todoPromises)
        .then(todoWithUser => {
          setAllTodos(todoWithUser);
          setTodos(todoWithUser);
        });
    });
  }, []);

  const handleCompletedTodos = (sortType: string) => {
    let completedTodos: Todo[] = todos;

    switch (sortType) {
      case 'all':
        setTodos(TodosFromServer);
        break;
      case 'active':
        completedTodos = TodosFromServer?.filter(todo => !todo.completed);
        setTodos(completedTodos);
        break;
      case 'completed':
        completedTodos = TodosFromServer?.filter(todo => todo.completed);
        setTodos(completedTodos);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter completed={handleCompletedTodos} />
            </div>

            <div className="block">
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
