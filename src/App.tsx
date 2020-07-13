import React, { useState } from 'react';
import './App.css';
import { fetchData } from './api/fetchData';
import { TodosBlock } from './components/TodosBlock';
import { Todo, User, TodoModified } from './interfaces/data';

const App: React.FC = () => {
  const API_URL_TODOS = 'https://mate.academy/students-api/todos';
  const API_URL_USERS = 'https://mate.academy/students-api/users';

  const [todos, setTodos] = useState<TodoModified[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const loadData = () => {
    let initTodos: Todo[];
    let users: User[];

    setError(false);
    setLoading(true);

    fetchData<Todo>(API_URL_TODOS)
      .then(data => {
        initTodos = data.data;

        return fetchData<User>(API_URL_USERS);
      })
      .then(data => {
        users = data.data;

        const preparedTodos: TodoModified[] = initTodos.map(({
          id,
          title,
          completed,
          userId,
        }) => {
          const userObj = users.find(user => user.id === userId)!;

          return {
            id,
            title,
            completed,
            userName: userObj.name,
          };
        });

        setTodos(preparedTodos);

        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <section className="task-wrap">
      <h1>Dynamic list of TODOs</h1>
      {
        todos.length === 0
          ? (
            <button
              className="init-btn"
              type="button"
              onClick={loadData}
              disabled={isLoading}
            >
              {isLoading && 'Loading...'}
              {hasError && 'Try again!'}
              {!isLoading && !hasError && 'Load'}
            </button>
          )
          : <TodosBlock todosList={todos} />
      }
    </section>
  );
};

export default App;
