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

  const loadData = async () => {
    let initTodos: Todo[];
    let users: User[];

    setError(false);
    setLoading(true);

    try {
      const [todosData, usersData] = await Promise.all([
        fetchData<Todo>(API_URL_TODOS),
        fetchData<User>(API_URL_USERS),
      ]);

      [initTodos, users] = [todosData.data, usersData.data];

      const preparedTodos: TodoModified[] = initTodos.map(({
        id,
        title,
        completed,
        userId,
      }) => {
        const userObj = users.find(user => user.id === userId);
        const name = (userObj) ? userObj.name : 'Undefined user';

        return {
          id,
          title,
          completed,
          userName: name,
        };
      });

      setTodos(preparedTodos);

      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
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
