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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [chosenFilter, setChosenFilter] = useState('all');

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

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleDeselectTodo = () => {
    setSelectedTodo(null);
  };

  const onTitleEnable = () => {
    setQuery('');
  };

  const getVisibleTodos = (
    todosList: Todo[],
    queryFilter: string,
    chosenFilt: string,
  ): Todo[] => {
    let visibleTodos = [...todosList];

    if (queryFilter.trim() !== '') {
      visibleTodos = visibleTodos.filter(todo =>
        todo.title.toLowerCase().includes(queryFilter.toLowerCase().trim()),
      );
    }

    if (chosenFilt === 'completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
    }

    if (chosenFilt === 'active') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
    }

    return visibleTodos;
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, query, chosenFilter);
  }, [todos, query, chosenFilter]);

  const isModalOpen = !!selectedTodo;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onTitleEnable={onTitleEnable}
                setQuery={setQuery}
                query={query}
                chosenFilter={chosenFilter}
                setChosenFilter={setChosenFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelected={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
              {showError && <p className="error">{showError}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal closeMod={handleDeselectTodo} todo={selectedTodo} />
      )}
    </>
  );
};
