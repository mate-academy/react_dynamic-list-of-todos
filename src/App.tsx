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
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [loading, setLoading] = useState(true);

  const selectedTodo = todosFromServer.find(todo => todo.id === todoId);
  const filteredTodos = todosFromServer.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
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
      .then((todos: Todo[]) => setTodosFromServer(todos))
      .finally(() => setLoading(false));
  });

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
                selectedTodoId={setTodoId}
                selectedTodo={selectedTodo}
              />
              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setTodoId={setTodoId}
        />
      )}

    </>
  );
};
