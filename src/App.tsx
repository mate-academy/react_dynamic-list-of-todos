/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState<string>('');
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(todosFromServer => setOriginalTodos(todosFromServer));
  }, []);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(originalTodos);
  const [todosQuery, setTodosQuery] = useState<Todo[]>();

  const handleFilter = () => {
    if (filter === Filter.All) {
      setFilteredTodos(originalTodos);
    } else if (filter === Filter.Active) {
      setFilteredTodos(originalTodos.filter(todo => !todo.completed));
    } else {
      setFilteredTodos(originalTodos.filter(todo => todo.completed));
    }
  };

  useEffect(() => {
    handleFilter();
    setTodosQuery(filteredTodos);
  }, [filter, query]);

  useEffect(() => {
    setTodosQuery(
      filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLocaleLowerCase()),
      ),
    );
  }, [query, filteredTodos]);

  //originaltodos is array with original todos,
  //filteredTodo is responsible for filter,
  //queryTodos is array with query filtered => finalArray

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter setFilter={setFilter} setQuery={setQuery} />
          </div>

          <div className="block">
            {originalTodos.length === 0 ? (
              <Loader />
            ) : (
              <TodoList
                todos={Array.isArray(todosQuery) ? todosQuery : originalTodos}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
