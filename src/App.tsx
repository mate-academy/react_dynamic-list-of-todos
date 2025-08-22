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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [chousedFilter, setChousedFilter] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        setShowError('Loading failed!!!');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleOpenMod = (todo: Todo) => {
    if (todo) {
      setSelectedTodo(todo);
      setIsModalOpen(true);
    }
  };

  const handleCloseMod = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const enableTitle = () => {
    setQuery('');
  };

  const getVisibleTodos = (
    todosList: Todo[],
    queryFilter: string,
    chousedFilt: string,
  ): Todo[] => {
    let visibleTodos = [...todosList];

    if (queryFilter.trim() !== '') {
      visibleTodos = visibleTodos.filter(todo =>
        todo.title.toLowerCase().includes(queryFilter.toLowerCase().trim()),
      );
    }

    if (chousedFilt === 'completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
    }

    if (chousedFilt === 'active') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
    }

    return visibleTodos;
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, query, chousedFilter);
  }, [todos, query, chousedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                enableTitle={enableTitle}
                setQuery={setQuery}
                query={query}
                chousedFilter={chousedFilter}
                setChousedFilter={setChousedFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  openMod={handleOpenMod}
                  selectedTodo={selectedTodo}
                />
              )}
              {showError && <p className="error">{showError}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal closeMod={handleCloseMod} todo={selectedTodo} />
      )}
    </>
  );
};
