/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { FILTER } from './types/filterTypes';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<string>(FILTER.ALL);
  const [searchField, setSearchField] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(items => {
        setTodos(items);
      });
  }, []);

  const searchedTodos:Todo[] = useMemo(() => {
    return todos
      .filter(todo => {
        const title = todo.title.toLowerCase();
        const searchText = searchField.toLowerCase();

        return title.includes(searchText);
      });
  }, [todos, searchField]);

  const filteredTodos:Todo[] = useMemo(() => {
    switch (filterType) {
      case FILTER.COMPLETED:
        return searchedTodos.filter(todo => todo.completed);
      case FILTER.ACTIVE:
        return searchedTodos.filter(todo => !todo.completed);
      default:
        return searchedTodos;
    }
  }, [filterType, searchedTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterType={setFilterType}
                searchField={searchField}
                setSearchField={setSearchField}
              />
            </div>

            <div className="block">
              { !todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
