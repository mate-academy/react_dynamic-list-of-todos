/* eslint-disable max-len */
import {
  FC, useState, useEffect, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = todos.filter(todo => {
      const todoTitle = todo.title.toLowerCase();
      const queried = query.toLowerCase().trim();

      return todoTitle.includes(queried);
    });
  }

  visibleTodos = useMemo(() => visibleTodos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  }), [filter, visibleTodos, query]);

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
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (todos.length > 0
                  && (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodo={selectedTodo}
                      setSelectedTodo={setSelectedTodo}
                    />
                  )
                )}
            </div>

          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
