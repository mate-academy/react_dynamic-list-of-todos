import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterOptions } from './types/FilterOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterOption, setFilterOption] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchTodos() {
      const data = await getTodos();

      setTodos(data);
      setIsLoaded(true);
    }

    fetchTodos();
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodo = () => {
    setSelectedTodo(null);
  };

  const filterTodos = (option: string, queryString: string) => {
    switch (true) {
      case option === FilterOptions.active:
        return todos.filter(todo => (
          !todo.completed
          && todo.title.toLowerCase().includes(queryString.toLowerCase())
        ));

      case option === FilterOptions.completed:
        return todos.filter(todo => (
          todo.completed
          && todo.title.toLowerCase().includes(queryString.toLowerCase())
        ));

      case queryString.length > 0:
        return todos.filter(
          todo => todo.title.toLowerCase().includes(queryString.toLowerCase()),
        );

      default:
        return todos;
    }
  };

  const changeQuery = (str: string) => {
    setQuery(str);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const filteredTodos = filterTodos(filterOption, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setFilterOption}
                onQuery={changeQuery}
                onClear={clearQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? <Loader />
                : (
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
