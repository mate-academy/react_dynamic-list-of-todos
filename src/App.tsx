import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoCompletionFilter } from './types/TodoCompletionTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let todosCopy = [...todos];

    if (filterType === TodoCompletionFilter.Active) {
      todosCopy = todosCopy.filter(todo => !todo.completed);
    }

    if (filterType === TodoCompletionFilter.Completed) {
      todosCopy = todosCopy.filter(todo => todo.completed);
    }

    todosCopy = todosCopy.filter(todo => todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase()));

    return todosCopy;
  }, [todos, filterType, query]);

  const selectedTodo = visibleTodos.find(todo => todo.id === selectedTodoId);

  const renderedList = (visibleTodos.length === 0 || hasError)
    ? (
      <h2>Todos not found!</h2>
    )
    : (
      <TodoList
        todos={visibleTodos}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
      />
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : renderedList}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
