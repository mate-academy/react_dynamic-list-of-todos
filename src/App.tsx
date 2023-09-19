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
import { TodoStatus } from './types/TodoStatus ';

function hasNormalizedQuery(content: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return content.toLowerCase().includes(normalizedQuery);
}

function filterBySelect(todo: Todo, selectedOption: string) : boolean {
  switch (selectedOption) {
    case TodoStatus.Active:
      return !todo.completed;
    case TodoStatus.Completed:
      return todo.completed;
    default:
      return true;
  }
}

function filterTodosByQuery(todos: Todo[], query: string, selectedOption: string) {
  if (!query && !selectedOption) {
    return todos;
  }

  return todos.filter((todo) => (
    hasNormalizedQuery(todo.title, query)
    && filterBySelect(todo, selectedOption)
  ));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then((newTodos) => {
        setTodos(newTodos);
        setIsLoading(true);
      })
      .catch(() => setErrorMessage('Try again later'));
  }, []);

  const visibleTodos = filterTodosByQuery(todos, query, selectedOption);

  const handleModal = (todo: Todo | undefined) => {
    setSelectedTodo(todo);
  };

  const filterCallBack = (newQuery: string) => {
    setQuery(newQuery);
  };

  const onChangeSelect = (newOption: string) => {
    setSelectedOption(newOption);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={filterCallBack}
                onChangeSelect={onChangeSelect}
                query={query}
              />
            </div>

            <div className="block">
              {!isLoading && (
                <Loader />
              )}

              {isLoading && !errorMessage && (
                <TodoList
                  todos={visibleTodos}
                  onHandleModal={handleModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && !errorMessage && (
        <TodoModal
          onHandleModal={handleModal}
          selectedTodo={selectedTodo}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
};
