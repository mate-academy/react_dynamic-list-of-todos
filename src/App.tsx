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
import { getErrorMessage, filterTodos } from './HELPER_FUNCTIONS';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filterBySelect, setFilterBySelect] = useState(FilterBySelect.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorGetTodos, setErrorGetTodos] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => setAllTodos(todos))
      .catch(error => setErrorGetTodos(getErrorMessage(error)));
  }, []);

  const getVisibleTodos = useCallback(() => {
    const visibleTodos = allTodos.filter(todo => {
      const lowerCaseTodo = todo.title.toLocaleLowerCase();

      return lowerCaseTodo.includes(query.toLocaleLowerCase());
    });

    return filterTodos(visibleTodos, filterBySelect);
  }, [query, filterBySelect, allTodos]);

  const visibleTodos = getVisibleTodos();
  const isAnyTodos = allTodos.length > 0;
  const isNotTodosAndError = !isAnyTodos && !errorGetTodos;

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

            {errorGetTodos && (
              <span style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'red',
                fontSize: 26,
              }}
              >
                {errorGetTodos}
              </span>
            )}

            {isNotTodosAndError && <Loader />}

            {isAnyTodos && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  onsetSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              </div>
            )}

          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onsetSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
