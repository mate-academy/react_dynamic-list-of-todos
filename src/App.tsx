import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setAllTodos(todos);
        setFilteredTodos(todos);
      })
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    const filterTodosList = () => {
      let result = allTodos;

      switch (filter) {
        case 'active':
          result = allTodos.filter(todo => !todo.completed);
          break;

        case 'completed':
          result = allTodos.filter(todo => todo.completed);
          break;

        default:
          break;
      }

      if (searchQuery) {
        result = result.filter(todo =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      return result;
    };

    setFilteredTodos(filterTodosList());
  }, [filter, allTodos, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentFilter={filter}
                setFilter={setFilter}
                query={searchQuery}
                setQuery={setSearchQuery}
              />
            </div>

            {loader ? <Loader /> : <TodoList todos={filteredTodos} />}
          </div>
        </div>
      </div>
    </>
  );
};
