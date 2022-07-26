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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setInitialTodos(todosFromServer);
      setTodos(todosFromServer);
      setIsDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    switch (filter) {
      case Filter.All:
        setTodos(initialTodos);
        break;

      case Filter.Active:
        setTodos(initialTodos.filter(todo => !todo.completed));
        break;

      case Filter.Completed:
        setTodos(initialTodos.filter(todo => todo.completed));
        break;

      default:
        break;
    }

    setTodos(
      prevTodos => prevTodos.filter(
        todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [filter, searchQuery]);

  const handleTodoSelect = (todo: Todo | null) => (
    setSelectedTodo(todo)
  );

  const handleFilterSelect = (value: Filter) => {
    setFilter(value);
  };

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
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
                onFilterSelect={handleFilterSelect}
                searchQuery={searchQuery}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!isDataLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    onTodoSelect={handleTodoSelect}
                    selectedTodoID={selectedTodo?.id || 0}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
