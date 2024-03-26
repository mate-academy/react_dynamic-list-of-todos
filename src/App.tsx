// App.tsx
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [isTodoModalShown, setIsTodoModalShown] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    } else if (filter === 'active') {
      return (
        !todo.completed &&
        todo.title.toLowerCase().includes(query.trim().toLowerCase())
      );
    } else if (filter === 'completed') {
      return (
        todo.completed &&
        todo.title.toLowerCase().includes(query.trim().toLowerCase())
      );
    }

    return true;
  });

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                setIsTodoModalShown={setIsTodoModalShown}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isTodoModalShown && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setIsTodoModalShown={setIsTodoModalShown}
        />
      )}
    </>
  );
};
