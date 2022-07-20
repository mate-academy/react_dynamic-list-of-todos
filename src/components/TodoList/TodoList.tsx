import React, { useCallback, useEffect, useState } from 'react';
import { TodoInfo } from '../TodoInfo';
import { getTodo } from '../../api/api';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  onUserIdChange: (userId: number) => void,
};

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const TodoList: React.FC<Props> = React.memo(({ onUserIdChange }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromServer = await getTodo();

      setTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    };

    try {
      fetchTodos();
    } catch (error) {
      throw new Error('Failed to load todos from server');
    }
  }, []);

  const handleQueryFiltering = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  const handleQueryChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
    setVisibleTodos([...todos].filter(
      todo => handleQueryFiltering(todo.title),
    ));
  }, [query]);

  const handleFilterChange = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterByStatus(event.target.value);
    switch (filterByStatus) {
      case SortType.ACTIVE:
        setVisibleTodos([...todos].filter(todo => !todo.completed
          && handleQueryFiltering(todo.title)));
        break;

      case SortType.COMPLETED:
        setVisibleTodos([...todos].filter(todo => todo.completed
          && handleQueryFiltering(todo.title)));
        break;

      default:
        setVisibleTodos([...todos].filter(todo => {
          return handleQueryFiltering(todo.title);
        }));
    }
  }, [filterByStatus]);

  const handleUserIdChange = (todo: Todo) => {
    if (todo.userId) {
      onUserIdChange(todo.userId);
    }
  };

  const randomize = () => {
    const randomizedArray = [...visibleTodos];
    let currentIndex = randomizedArray.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [randomizedArray[currentIndex], randomizedArray[randomIndex]]
        = [randomizedArray[randomIndex], randomizedArray[currentIndex]];
    }

    setVisibleTodos(randomizedArray);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          data-cy="filterByTitle"
          className="form-control"
          type="text"
          value={query}
          placeholder="Type search word"
          onChange={(event) => {
            handleQueryChange(event);
          }}
        />

        <select
          className="form-select"
          aria-label="Default select example"
          value={filterByStatus}
          onChange={(event) => {
            handleFilterChange(event);
          }}
        >
          <option value={SortType.ALL}>All</option>
          <option value={SortType.ACTIVE}>Active</option>
          <option value={SortType.COMPLETED}>Completed</option>
        </select>

        <button
          type="button"
          onClick={randomize}
          className="btn btn-light"
        >
          Randomize
        </button>

        <TodoInfo
          visibleTodos={visibleTodos}
          handleUserIdChange={handleUserIdChange}
        />

      </div>
    </div>
  );
});
