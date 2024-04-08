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
import { FieldFilter } from './types/FieldFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filteredBy, setFilteredBy] = useState<FieldFilter>(FieldFilter.All);

  const [isLoading, setIsLoading] = useState(false);

  const visibleTodos = getFilteredTodos(todos, query, filteredBy);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block"></div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoFilter
                onFilterBy={setFilteredBy}
                onFilterByQuery={setQuery}
                query={query}
              />

              <TodoList
                todos={visibleTodos}
                onSelect={setSelectedTodo}
                selectedTodoId={selectedTodo?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelect={setSelectedTodo} />
      )}
    </>
  );
};
