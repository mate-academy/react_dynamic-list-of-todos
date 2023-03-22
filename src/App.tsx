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

export const App: React.FC = () => {
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setSelectedTodos(todos);
        setIsLoading(false);
      });
  }, []);

  const initialFilter = () => {
    switch (status) {
      case 'active':
        return selectedTodos.filter(todo => !todo.completed);

      case 'completed':
        return selectedTodos.filter(todo => todo.completed);

      case 'all':
      default:
        return selectedTodos;
    }
  };

  const todoFilter = () => {
    if (query === '') {
      return initialFilter();
    }

    return initialFilter()
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  };

  const filteredTodos = todoFilter();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onChangeQuery={setQuery}
                onChangeStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    todoSelected={todoSelected}
                    onSelectedTodo={setTodoSelected}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {todoSelected && (
        <TodoModal
          todoSelected={todoSelected}
          onSelectedTodo={setTodoSelected}
        />
      )}
    </>
  );
};
