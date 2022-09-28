/* eslint-disable import/no-cycle */
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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelecetedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });

  useEffect(() => {
    getTodos()
      .then((todosFromServer: Todo[]) => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                filter={filter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              <TodoList
                filteredTodos={filteredTodos}
                selectedTodoId={setSelecetedTodoId}
                selectedTodo={selectedTodo}
                loading={isLoading}
              />
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setTodoId={setSelecetedTodoId}
        />
      )}

    </>
  );
};
