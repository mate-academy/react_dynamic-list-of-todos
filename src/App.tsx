import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  let filteredTodos
    = (filteredBy === 'all') ? todos : todos.filter((todo) => {
      switch (filteredBy) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });

  filteredTodos
    = filteredTodos.filter(todo => todo.title.toLowerCase().includes(
      query.toLowerCase(),
    ));

  useEffect(() => {
    setLoading(true);
    getTodos().then(setTodos).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredBy={setFilteredBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
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
