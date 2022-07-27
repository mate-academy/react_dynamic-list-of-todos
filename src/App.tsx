/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState<string>(SortType.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const displayedTodos = todos.filter(todo => {
    if ((filteredBy === SortType.ACTIVE && todo.completed)
    || (filteredBy === SortType.COMPLETED && !todo.completed)) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLocaleLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onFilterType={setFilteredBy}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={displayedTodos}
                    selectedTodoId={selectedTodo?.id}
                    selectedTodo={setSelectedTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          onClose={() => setSelectedTodo(null)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
