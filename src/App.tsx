import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';

import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [allTodos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, selectTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(true);

  function toLowerCompare(str: string, part: string): boolean {
    return str
      .toLowerCase()
      .includes(part.toLowerCase());
  }

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case 'all':
        return allTodos;

      case 'active':
        return allTodos
          .filter(todo => !todo.completed && toLowerCompare(todo.title, query));

      case 'completed':
        return allTodos
          .filter(todo => todo.completed && toLowerCompare(todo.title, query));

      default:
        return [];
    }
  }, [filterBy, allTodos, query]);

  useEffect(() => {
    async function getData() {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setLoading(false);
    }

    getData();
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
              { isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    callback={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        callback={selectTodo}
      />
    </>
  );
};
