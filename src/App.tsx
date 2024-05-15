/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { getFilteredTodos } from './utils/getFilteredTodos';

type CurrentTodo = Todo | null;

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [query, setQuery] = useState('');
  const [todo, setTodo] = useState<CurrentTodo>(null);

  const filteredTodos = getFilteredTodos(todos, filterBy, query);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={filteredTodos}
                currentTodo={todo}
                setTodo={setTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} setTodo={setTodo} />}
    </>
  );
};
