/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';

export type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filterBy, setFilterBy] = useState<Filter>('all');
  const [searchText, setSearchText] = useState('');

  const filteredTodos = todos
    .filter(todo => {
      if (filterBy === 'active') {
        return !todo.completed;
      }

      if (filterBy === 'completed') {
        return todo.completed;
      }

      return true; // 'all'
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchText.toLowerCase()),
    );

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    getTodos()
      .then(dados => {
        if (isMounted) {
          setTodos(dados);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={todo => setSelectedTodo(todo)}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
