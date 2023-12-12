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
import { getfilteredTodos } from './helpers';

export const App: React.FC = () => {
  const [renderedTodos, setRenderedList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    getTodos()
      .then(setRenderedList)
      .finally(() => setIsLoaded(false));
  }, []);

  const filteredList = getfilteredTodos(renderedTodos, query, selectedOption);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {isLoaded
                ? <Loader />
                : (
                  <TodoList
                    filteredList={filteredList}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} setTodo={setSelectedTodo} />}
    </>
  );
};
