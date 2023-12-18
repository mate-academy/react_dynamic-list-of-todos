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
import { FilterBy } from './types/FilterBy';
import { filterBy } from './helpers';

const prepareTodos = (todos: Todo[], filter = FilterBy.all, query: string) => {
  let todosToPrepare = filterBy(todos, filter);

  if (query) {
    const lowerQuery = query.toLowerCase();

    todosToPrepare = todosToPrepare.filter(todo => todo.title
      .toLowerCase()
      .includes(lowerQuery));
  }

  return todosToPrepare;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterBy>(FilterBy.all);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos().then(result => {
      setIsLoading(false);
      setTodos(result);
    });
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setSearchQuery('');
  };

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterBy);
  };

  const todosToRender = prepareTodos(todos, filter, searchQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onQueryChange={handleQueryChange}
                handleClearQuery={handleClearQuery}
                onFilterSelect={handleFilterSelect}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {
                !!todosToRender.length
                && (
                  <TodoList
                    todos={todosToRender}
                    onTodoSelect={handleTodoSelect}
                    selectedTodo={selectedTodo}
                  />
                )
              }

            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            handleCloseTodo={handleCloseTodo}
          />
        )
      }
    </>
  );
};
