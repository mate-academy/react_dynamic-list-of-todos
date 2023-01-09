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
import { MainFilter } from './types/MainFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterPosition, setFilterPosition] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function todosFetch() {
      const data = await getTodos();

      setTodos(data);
      setIsLoaded(true);
    }

    todosFetch();
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodo = () => {
    setSelectedTodo(null);
  };

  const seacrhTodos = (position: string, searchQuery: string) => {
    switch (position) {
      case MainFilter.active:
        return todos.filter(todo => !todo.completed
           && todo.title.toLowerCase().includes(searchQuery.toLowerCase()));

      case MainFilter.completed:
        return todos.filter(todo => todo.completed
          && todo.title.toLowerCase().includes(searchQuery.toLowerCase()));

      default:
        if (searchQuery.length > 0) {
          return todos.filter(
            todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
          );
        }

        return todos;
    }
  };

  const newQuery = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const emptyQuery = () => {
    setQuery('');
  };

  const filteredTodos = seacrhTodos(filterPosition, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setFilterPosition}
                onQuery={newQuery}
                onClear={emptyQuery}
                query={query}

              />
            </div>

            <div className="block">
              {!isLoaded ? <Loader /> : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeTodo} />}
    </>
  );
};
