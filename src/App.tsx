/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(result => {
        setTodos(result);
        setIsLoaded(true);
      });
  }, []);

  const includeCheck = (inp: string) => (
    inp.toLowerCase().includes(query.toLowerCase())
  );

  const filterTodos = todos
    .filter(todoItem => {
      if (filterType === 'active') {
        return !todoItem.completed;
      }

      if (filterType === 'completed') {
        return todoItem.completed;
      }

      return todoItem;
    })
    .filter(todoItem => (includeCheck(todoItem.title)));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!isLoading
                && <Loader />}

              <TodoList
                todos={filterTodos}
                selectedTodo={todo}
                setSelectTodo={setTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {todo?.userId && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
