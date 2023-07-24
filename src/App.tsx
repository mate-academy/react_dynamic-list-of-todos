/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './utils/todo';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [loaded, setLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [state, setState] = useState('All');

  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      getTodos().then(todosFromServer => {
        setTodos(todosFromServer);
      }).finally(() => setLoaded(false));
    }, 1000);
  }, []);

  useEffect(() => {
    let filteredItems = [...todos];
    const normalizedQuery = query.trim().toLowerCase();

    if (query) {
      filteredItems = filteredItems.filter(
        todo => todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    switch (state) {
      case 'completed':
        filteredItems = filteredItems.filter(item => item.completed);
        break;

      case 'active':
        filteredItems = filteredItems.filter(item => !item.completed);
        break;

      default:
        break;
    }

    setFilteredTodos(filteredItems);
  }, [todos, query, state]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                state={state}
                onStateChange={setState}
              />
            </div>

            <div className="block">
              {loaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todoModal={selectedTodo}
          onDeleteSelected={setSelectedTodo}
        />
      )}
    </>
  );
};
