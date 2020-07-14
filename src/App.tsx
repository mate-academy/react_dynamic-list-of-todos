import React, { useState } from 'react';
import './App.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { Button } from './components/Button';
import { SortFields } from './components/Enums';

const HEADERS: SortButton[] = [
  {
    name: 'Id',
    field: SortFields.Id,
  },
  {
    name: 'Name',
    field: SortFields.Name,
  },
  {
    name: 'Title',
    field: SortFields.Title,
  },
  {
    name: 'Completed',
    field: SortFields.Completed,
  },
];

const App = () => {
  const [todos, setTodos] = useState([]);
  const [sortField, setSortField] = useState(SortFields.Id);
  const [sortReverse, setSortReverse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadGoods = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getTodos();

      setTodos(data);
      setIsLoaded(true);
    } catch (err) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const handleSortButton = (field: SortFields) => {
    const reverseStatus = (sortField === field) ? !sortReverse : false;

    setSortField(field);
    setSortReverse(reverseStatus);
  };

  const getSortField = (a: Todo, b: Todo) => {
    const sortDirection = (sortReverse) ? -1 : 1;

    switch (sortField) {
      case SortFields.Id:
        return (a.id as number) - (b.id as number) * sortDirection;

      case SortFields.Name:
        return (a.user.username).localeCompare(b.user.username) * sortDirection;

      case SortFields.Title:
        return (a.title).localeCompare(b.title) * sortDirection;

      case SortFields.Completed:
        return (Number(a.completed) - Number(b.completed)) * -sortDirection;

      default:
        return (a.id as number) - (b.id as number) * sortDirection;
    }
  };

  const sortTodos = () => {
    return [...todos].sort(getSortField);
  };

  const sortedTodos: Todo[] = sortTodos();

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">List of TODOs</h1>
        {!isLoading && !isLoaded && !hasError && (
          <Button
            text="Load ToDos"
            className="button"
            handleClick={loadGoods}
          />
        )}
        {isLoading && <progress className="progress is-primary" max="100" />}
        {hasError && (
          <>
            <div className="notification is-warning">Something went wrong...</div>
            <Button
              text="Try Again"
              className="button"
              handleClick={loadGoods}
            />
          </>
        )}
        {isLoaded && (
          <TodoList
            todos={sortedTodos}
            headers={HEADERS}
            handleSortButton={handleSortButton}
          />
        )}
      </div>
    </section>
  );
};

export default App;
