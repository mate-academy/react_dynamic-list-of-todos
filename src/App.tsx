import React, { useState, FC } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { getTodos, getUsers } from './api';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [originalTodos, setOriginalTodos] = useState<TodoWithUser[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoWithUser[]>([...todos]);
  const [isLoading, setLodaing] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const loadTodos = async () => {
    setLodaing(true);
    setError(false);

    try {
      const [todoList, users] = await Promise.all([getTodos(), getUsers()]);

      const todosWithUsers = todoList.map(todo => ({
        ...todo,
        user: users.find(user=> user.id === todo.userId) as User,
      }));

      setTodos(todosWithUsers);
      setOriginalTodos(todosWithUsers);
      setFilteredTodos(todosWithUsers);
      setLoaded(true);
    } catch (error) {
      setError(true);
    }

    setLodaing(false);
  };

  const filter = (typeOfFilter: string) => {
    switch (typeOfFilter) {
      case 'sortByTitle':
        setFilteredTodos([...originalTodos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByName':
        setFilteredTodos([...originalTodos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'sortByCompleted':
        setFilteredTodos([...originalTodos]
          .sort((a, b) =>  +(a.completed) - +(b.completed)));
        break;
      default:
    }
  };

  return (
    <>
      {isLoaded ? (
        <>
              <div className="buttons-wrapper">
              <button
                type="button"
                onClick={() => filter('sortByTitle')}
              >
                Sort by title
              </button>
              <button
                type="button"
                onClick={() => filter('sortByName')}
              >
                Sort by user
              </button>
              <button
                type="button"
                onClick={() => filter('sortByCompleted')}
              >
                Sort by completeness
              </button>
            </div>
        <TodoList
          todos={filteredTodos}
        />
        </>
      ) : (
        <div className="wrapper">
          {hasError && (
            <h2 className="error-title">Error loading data occured.</h2>
          )}
          <button
            type="button"
            onClick={loadTodos}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load todos'}
          </button>
        </div>
      )}
    </>
  );
};

export default App;
