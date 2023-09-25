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

function filterBySelect(todo: Todo, selectedOption: TodoStatus) : boolean {
  switch (selectedOption) {
    case TodoStatus.Active:
      return !todo.completed;
    case TodoStatus.Completed:
      return todo.completed;
    default:
      return true;
  }
}

function filterTodosByQuery(todos: Todo[], query: string, selectedOption: TodoStatus) {
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(TodoStatus.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((newTodos) => {
        setTodos(newTodos);
        setIsLoading(false);
      })
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = filterTodosByQuery(todos, query, selectedOption);

  const handleToggleModal = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleFilterCallBack = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleChangeSelect = (newOption: TodoStatus) => {
    setSelectedOption(newOption);
  };

  const isShowModal = selectedTodo && !errorMessage && !isLoading;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={handleFilterCallBack}
                onChangeSelect={handleChangeSelect}
                query={query}
                selectedOption={selectedOption}
                onSetSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && !errorMessage && (
                <TodoList
                  todos={visibleTodos}
                  onHandleModal={handleToggleModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isShowModal && (
        <TodoModal
          onHandleModal={handleToggleModal}
          selectedTodo={selectedTodo}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
};
