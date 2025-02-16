/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  const filterTodos = (newQuery: string, filter: Filter): Todo[] => {
    let filteredTodos = todos;

    switch (filter) {
      case Filter.All:
        break;

      case Filter.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case Filter.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        return filteredTodos;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(newQuery.toLowerCase()),
      );
    }

    return filteredTodos;
  };

  const filteredTodos = filterTodos(query, currentFilter);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={query}
                handleQuery={setQuery}
                handleFilterChange={setCurrentFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={filteredTodos}
                modalState={isModal}
                selectedTodo={selectedTodo}
                handleModal={setIsModal}
                handleSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isModal && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleModal={setIsModal}
          handleSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
