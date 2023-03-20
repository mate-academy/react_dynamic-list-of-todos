/* eslint-disable no-alert */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const getFilteredTodos = (todos: Todo[], query: string, filterType: FilterType) => {
  const visibleTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  switch (filterType) {
    case FilterType.COMPLETED:
      return visibleTodos.filter(todo => todo.completed);

    case FilterType.ACTIVE:
      return visibleTodos.filter(todo => !todo.completed);

    default:
      return visibleTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [areTodosLoading, setAreTodosLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setAreTodosLoading(true);
      } catch (error) {
        alert('Failed on loading todos from server');
      }
    };

    getTodosFromServer();
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, filterType);

  const getTodoById = (todoId: number) => {
    return todos.find(todo => todo.id === todoId) || todos[0];
  };

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
              {areTodosLoading
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                    setIsUserLoading={setIsUserLoading}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          selectedTodo={getTodoById(selectedTodoId)}
          setSelectedTodoId={setSelectedTodoId}
          isUserLoading={isUserLoading}
          setIsUserLoading={setIsUserLoading}
        />
      )}
    </>
  );
};
