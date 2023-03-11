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
import { FilterType } from './types/Filter';

const handleFilteringTodos = (todos: Todo[], query: string, filterType: FilterType) => {
  let initialTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase().trim();

    initialTodos = initialTodos.filter(searchedTodo => (
      searchedTodo.title.toLowerCase().includes(lowerQuery)
    ));
  }

  switch (filterType) {
    case FilterType.ACTIVE:
      initialTodos = initialTodos.filter(visibleTodo => !visibleTodo.completed);
      break;
    case FilterType.COMPLETED:
      initialTodos = initialTodos.filter(visibleTodo => visibleTodo.completed);
      break;
    case FilterType.ALL:
    default:
      break;
  }

  return initialTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [query, setQuery] = useState('');
  const visibleTodos = handleFilteringTodos(todos, query, filterType);

  const handleTodos = async () => {
    const currentTodo = await getTodos();

    setTodos(currentTodo);
  };

  useEffect(() => {
    handleTodos();
  });

  const closeTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                query={query}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={(todoId: Todo) => {
                      setSelectedTodo(todoId);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeTodo={closeTodo}
        />
      )}
    </>
  );
};
