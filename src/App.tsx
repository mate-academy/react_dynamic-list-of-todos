/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      if (filterStatus === FilterStatus.Active) {
        return !todo.completed;
      }

      if (filterStatus === FilterStatus.Completed) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <TodoFilter
            onSelect={setFilterStatus}
            onInput={setSearchQuery}
            query={searchQuery}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <TodoList
              todos={filteredTodos}
              onChoose={setSelectedTodo}
              chosenTodo={selectedTodo}
            />
          )}
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClear={() => setSelectedTodo(null)} />
      )}
    </div>
  );
};
