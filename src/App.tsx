/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilter, setTodosFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  function getSelectedTodoById() {
    return todos.find(todo => todo.id === selectedTodoId) || todos[0];
  }

  const handlerFilterTodos = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    return setTodosFilter(event.target.value);
  };

  const handlerInputValue = (str: string) => setQuery(str);

  const handleSelectTodo = (id: number) => setSelectedTodoId(id);

  const filteredTodos = todos
    .filter(todo => {
      if (todosFilter === 'active') {
        return !todo.completed;
      }

      if (todosFilter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={handlerInputValue}
                filter={todosFilter}
                setTodosFilter={handlerFilterTodos}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodoId}
                  setSelectedTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          selectedTodo={getSelectedTodoById()}
          setSelectedTodo={handleSelectTodo}
        />
      )}
    </>
  );
};
