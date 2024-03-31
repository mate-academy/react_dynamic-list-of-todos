/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { getFilteredTodos } from './utils/GetFiltreredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filteredBy, setFilteredBy] = useState('all');

  const [loading, setLoading] = useState(false);

  const visibleTodos = getFilteredTodos(todos, query, filteredBy);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block"></div>

            <div className="block">
              {loading && <Loader />}
              <TodoFilter
                onFilterBy={setFilteredBy}
                onFilterByQuery={setQuery}
                query={query}
              />

              <TodoList
                todos={visibleTodos}
                onSelect={todo => setSelectedTodo(todo)}
                selectedTodoId={selectedTodo?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelect={todo => setSelectedTodo(todo)}
        />
      )}
    </>
  );
};
