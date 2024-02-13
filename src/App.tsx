/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(FilterStatus.All);
  const [query, setQuery] = useState('');


  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const searchedTodos = todos.filter((todo) => todo
    .title.toLowerCase().includes(query.toLowerCase()));

  const filteredTodos = useMemo(() => {
    switch (selectedFilter) {
      case FilterStatus.Active:
        return searchedTodos.filter((todo) => !todo.completed);
      case FilterStatus.Completed:
        return searchedTodos.filter((todo) => todo.completed);
      default:
        return searchedTodos;
    }
  }, [searchedTodos, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setSelectedFilter}
                query={query}
                setSearchQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={filteredTodos}
                    todoId={todoId}
                    setTodoId={setTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={filteredTodos}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
