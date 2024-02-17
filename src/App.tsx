import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api/api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(Status.All);
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
    .title.trim().toLowerCase().includes(query.trim().toLowerCase()));

  const filteredTodos = useMemo(() => {
    switch (selectedFilter) {
      case Status.Active:
        return searchedTodos.filter((todo) => !todo.completed);

      case Status.Completed:
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
                query={query}
                setSearchQuery={setQuery}
                setFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {loading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todoId={todoId}
                    setTodoId={setTodoId}
                    todos={filteredTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          setTodoId={setTodoId}
          todos={filteredTodos}
        />
      )}
    </>
  );
};
