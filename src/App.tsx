import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortQuery } from './types/Sort';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortQuery, setSortQuery] = useState<SortQuery>(SortQuery.ALL);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        return fetchedTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      })
      .then(filteredTodos => {
        return filteredTodos.filter(todo => {
          if (sortQuery === SortQuery.ACTIVE) {
            return !todo.completed;
          }

          if (sortQuery === SortQuery.COMPLETED) {
            return todo.completed;
          }

          return true; // This line was adjusted for clarity
        });
      })
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [sortQuery, query]);

  const handleCloseModal = () => setSelectedTodo(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                onSelect={setSortQuery}
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
              />
            </div>
            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                selectedTodo={selectedTodo}
                onTodoSelect={todo => setSelectedTodo(todo)}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
