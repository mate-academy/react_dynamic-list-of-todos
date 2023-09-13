/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getFilteredTodos = (todos: Todo[], query: string, selectedFilter: string) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todos.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (selectedFilter) {
    switch (selectedFilter) {
      case 'active':
        return todosCopy.filter((todo) => todo.completed === false);
      case 'completed':
        return todosCopy.filter((todo) => todo.completed === true);
      default:
        return todosCopy;
    }
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getTodos().then(setTodos);
    }, 1000);

    getTodos().then((todosFrommServer) => {
      setTodos(todosFrommServer);

      setTimeout(() => {
        setLoading(false);
      }, 100);
    });
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, selectedFilter);

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
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
