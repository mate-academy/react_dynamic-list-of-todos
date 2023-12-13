/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getFilteredTodos } from './helpers';
import { SelectorOption } from './enum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentSelector, setCurrentSelector] = useState<string>(SelectorOption.All);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = getFilteredTodos(todos, currentSelector, searchQuery) || null;

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-alert
      .catch(() => alert('Error during todos reciving 😥'))
      .finally(() => {
        setIsLoading(false);

        return new Promise(resolve => setTimeout(resolve, 2000));
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setCurrentSelector={setCurrentSelector}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodo={selectedTodo}
                      setTodo={(recivedTodo) => (
                        setSelectedTodo(recivedTodo)
                      )}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
