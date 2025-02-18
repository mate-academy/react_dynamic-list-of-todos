/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const FILTER = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

const STATUS = {
  resolved: 'resolved',
  rejected: 'rejected',
  idle: 'idle',
  pending: 'pending',
} as const;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null | undefined>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>(STATUS.idle);
  const [completeStatus, setCompleteStatus] = useState<string>(FILTER.all);
  const [searchInput, setSearchInput] = useState<string>('');
  const [error, setError] = useState('');

  const todo = todos?.find(t => t.id === selectedTaskId);

  const filteredTodos = useMemo(() => {
    const normalizedSearch = searchInput.toLowerCase().trim();
    let filtered = todos;

    switch (completeStatus) {
      case FILTER.active:
        filtered = todos?.filter(task => !task.completed);
        break;
      case FILTER.completed:
        filtered = todos?.filter(task => task.completed);
        break;
      case FILTER.all:
        break;
      default: {
        throw new Error('Invalid complete status');
      }
    }

    if (!normalizedSearch) {
      return filtered;
    }

    return filtered?.filter(t =>
      t.title.toLowerCase().trim().includes(normalizedSearch),
    );
  }, [completeStatus, todos, searchInput]);

  useEffect(() => {
    setStatus(STATUS.pending);
    const loadData = () => {
      getTodos()
        .then(data => {
          setTodos(data);
          setStatus(STATUS.resolved);
        })
        .catch(() => {
          setStatus(STATUS.rejected);
          setError('Todos cant be loaded. Try again later');
        });
    };

    loadData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {status === STATUS.rejected && <p>{error}</p>}
            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setCompleteStatus={setCompleteStatus}
              />
            </div>

            <div className="block">
              {status === STATUS.pending && <Loader />}
              <TodoList
                selectedTask={selectedTaskId}
                filteredTodos={filteredTodos}
                setSelectedTask={setSelectedTaskId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTaskId !== null && (
        <TodoModal setSelectedTask={setSelectedTaskId} todo={todo} />
      )}
    </>
  );
};
