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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos?.filter(todo => todo.completed === false);
      case 'completed':
        return todos?.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const queryFilter = (todoList: Todo[]) => {
    return todoList?.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                onDelete={handleDeleteQuery}
              />
            </div>

            <div className="block">
              {!(todos.length > 0) ? (
                <Loader />
              ) : (
                <TodoList
                  todos={queryFilter(filteredTodos())}
                  selectedTodo={selectedTodo}
                  onTodoSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
