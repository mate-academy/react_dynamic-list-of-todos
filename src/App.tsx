/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTodoBy, setFilterTodoBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromServer = await getTodos();

      setIsLoading(false);
      setTodos(todosFromServer);
    };

    fetchTodos();
  }, []);

  const visibleTodos = useMemo(() => todos
    .filter(({ completed, title }) => {
      const compareTitle = title.toLowerCase()
        .includes(query.toLowerCase());

      switch (filterTodoBy) {
        case 'active':
          return !completed && compareTitle;

        case 'completed':
          return completed && compareTitle;

        default:
          return compareTitle;
      }
    }), [todos, filterTodoBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                filterTodoBy={filterTodoBy}
                setFilterTodoBy={setFilterTodoBy}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodos}
                      selectTodo={todo}
                      setSelectedTodo={setTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {todo?.userId && (
        <TodoModal
          todo={todo}
          selectedTodo={setTodo}
        />
      )}

    </>
  );
};
