import React, { useState } from 'react';
import './App.css';
import { Spinner } from 'reactstrap';
import { getPreparedTodos } from './api';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodosFromServer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFirstPage, setLoadingFirstPage] = useState<boolean>(false);

  const downloadTodos = () => {
    setLoading(true);
    getPreparedTodos()
      .then(todo => setTodos(todo))
      .finally(() => {
        setLoading(false);
        setLoadingFirstPage(true);
      });
  };

  const sortByTitle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByUserName = () => {
    setTodos([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const sortByStatus = () => {
    setTodos([...todos].sort((a, b) => +a.completed - +b.completed));
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {loadingFirstPage
        ? (
          <div className="todo__button">
            <button type="button" className="button info button__title" onClick={sortByTitle}>Sort By Title</button>
            <button type="button" className="button info button__name" onClick={sortByUserName}>Sort By Name</button>
            <button type="button" className="button info button__status" onClick={sortByStatus}>Sort By Status</button>
          </div>
        )
        : (
          <button type="button" className="button info button__loadTodo" onClick={downloadTodos}>
            {loading ? 'Loading...' : 'Load Todos'}
          </button>
        )}
      {
        loading
          ? (
            <div className="loading">
              <Spinner color="info" />
              <Spinner color="info" />
              <Spinner color="info" />
            </div>
          )
          : <TodoList todos={todos} />
      }
    </>
  );
};

export default App;
