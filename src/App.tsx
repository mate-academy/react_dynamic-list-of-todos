/* eslint-disable max-len */
import React, {useEffect, useMemo, useState} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<TodosFilter>(TodosFilter.all);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosList => {
        setTodos(todosList);
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const titleMatch = todo.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      switch (selectedFilter) {
        case TodosFilter.active:
          return titleMatch && !todo.completed;
        case TodosFilter.completed:
          return titleMatch && todo.completed;
        default:
          return titleMatch;
      }
    });
  }, [todos, query, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos || todos}
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
          todos={filteredTodos || todos}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
