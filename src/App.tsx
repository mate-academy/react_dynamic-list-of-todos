import React, { useState } from 'react';
import './App.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { Button } from './components/Button';
import { SortFields } from './components/Enums';

const SORT_BUTTONS: SortButton[] = [
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
    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const handleSortButton = (field: SortFields) => {
    const reversStatus = (sortField === field) ? !sortReverse : false;

    setSortField(field);
    setSortReverse(reversStatus);
  };

  const getSortField = (todo: Todo) => {
    switch (sortField) {
      case SortFields.Id:
        return todo.id;

      case SortFields.Name:
        return todo.user.username;

      case SortFields.Title:
        return todo.title;

      case SortFields.Completed:
        return Number(todo.completed);

      default:
        return todo.id;
    }
  };

  const sortTodos = () => {
    const sortDirection = (sortReverse) ? -1 : 1;

    return [...todos].sort((a, b) => {
      if (sortField === SortFields.Id) {
        const diff = (getSortField(a) as number) - (getSortField(b) as number);

        return diff * sortDirection;
      }

      if (sortField === SortFields.Title || sortField === SortFields.Name) {
        const diff = (getSortField(a) as string)
          .localeCompare(getSortField(b) as string);

        return diff * sortDirection;
      }

      if (sortField === SortFields.Completed) {
        const diff = ((getSortField(a) as number) - (getSortField(b) as number));

        return diff * -sortDirection;
      }

      return 0;
    });
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
            SORT_BUTTONS={SORT_BUTTONS}
            handleSortButton={handleSortButton}
          />
        )}
      </div>
    </section>
  );
};

export default App;
