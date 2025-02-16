/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const handleFoundTodos = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleFoundTodos={handleFoundTodos}
                setFilterValue={setFilterValue}
                filterValue={filterValue}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && (
                <Loader />
              )}

              {!loader && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  query={query}
                  filterValue={filterValue}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.id && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
