/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

type SortType = {
  sortBy: Filter;
  query: string;
};

const filterFunc = (todos: Todo[], { sortBy, query }: SortType) => {
  let res = [...todos];
  const prepearedQuery = query.trim().toLowerCase();

  switch (sortBy) {
    case Filter.Active:
      res = res.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      res = res.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (prepearedQuery) {
    return res
      .filter(todo => todo.title.toLowerCase().includes(prepearedQuery));
  }

  return res;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setLoading(false);
    });
  }, []);

  const fiteredTodos = filterFunc(todos, { sortBy, query });

  const hendleSetQuerty = (qu: string) => {
    if (qu.trim() !== '' || qu === '') {
      setQuery(qu);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setOption={setSortBy}
                query={query}
                setQuery={hendleSetQuerty}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={fiteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onEyeClick={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
