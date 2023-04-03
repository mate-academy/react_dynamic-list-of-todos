import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBySelect } from './types/FilterBySelect';
import { filterTodos, getErrorMessage } from './HelperFunctions';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filterBySelect, setFilterBySelect] = useState(FilterBySelect.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorGetTodos, setErrorGetTodos] = useState('');

  useEffect(() => {
    getTodos().then(todos => setAllTodos(todos))
      .catch(error => setErrorGetTodos(getErrorMessage(error)));
  }, []);

  const getVisibleTodos = useCallback(() => {
    const visibleTodos = allTodos.filter(todo => {
      const lowerCaseTodo = todo.title.toLocaleLowerCase();

      return lowerCaseTodo.includes(query.toLocaleLowerCase());
    });

    return filterTodos(visibleTodos, filterBySelect);
  }, [query, filterBySelect, allTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBySelect={filterBySelect}
                onSetQuery={setQuery}
                onSetFilterBySelect={setFilterBySelect}
              />
            </div>

            {errorGetTodos || (
              <span>
                {errorGetTodos}
              </span>
            )}

            {allTodos.length === 0 || errorGetTodos
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={getVisibleTodos()}
                    onsetSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          onsetSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
