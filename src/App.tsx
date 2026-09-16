/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo, TodoOptions } from './types/Todo';

const getVisibleTodos = (todos: Todo[], options: TodoOptions) => {
  let visibleTodos = [...todos];

  switch (options.filterType) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
  }

  const query = options.query.trim().toLowerCase();

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query),
    );
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [options, setOptions] = useState<TodoOptions>({
    filterType: 'all',
    query: '',
  });

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getVisibleTodos(todos, options);

  const handleOptionsUpdate = <K extends keyof TodoOptions>(
    key: K,
    newOption: TodoOptions[K],
  ) => {
    setOptions(prev => ({ ...prev, [key]: newOption }));
  };

  const openTodoModal = (newSelectedTodo: Todo) => {
    setSelectedTodo(newSelectedTodo);
  };

  const closeTodoModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter options={options} onChange={handleOptionsUpdate} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p className="has-text-danger has-text-weight-medium">
                  {errorMessage}
                </p>
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onClick={openTodoModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClick={closeTodoModal} />
      )}
      ;
    </>
  );
};
