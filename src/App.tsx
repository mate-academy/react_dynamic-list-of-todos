/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

function filteredTodos(todos:Todo[], filter:Filter, query:string) {
  let returnArr = [...todos];

  if (query) {
    returnArr = returnArr.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  switch (filter) {
    case Filter.ACTIVE:
      return returnArr.filter(todo => !todo.completed);
    case Filter.COMPLETED:
      return returnArr.filter(todo => todo.completed);
    default:
      return returnArr;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const visibleTodos = filteredTodos(todos, filterBy, query);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } finally {
      setLoadingData(false);
    }
  };

  const openTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos();
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
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadingData ? <Loader /> : (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  openTodo={openTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && <TodoModal selectTodo={selectTodo} closeTodo={closeTodo} />}
    </>
  );
};
