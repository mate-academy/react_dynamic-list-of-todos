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
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  let visibleTodos = todosFromServer;
  const todoToModal = visibleTodos.filter(todo => todo.id === selectedTodoId);

  useEffect(() => {
    const getTodosFromServer = async () => {
      const todos = await getTodos();

      setTodosFromServer(todos);
    };

    getTodosFromServer()
      .catch(Error);
  }, []);

  const selectTodo = (id: number) => {
    if (selectedTodoId !== id) {
      setSelectedTodoId(id);
    } else {
      setSelectedTodoId(0);
    }
  };

  switch (status) {
    case 'all':
      visibleTodos = todosFromServer;
      break;

    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo => {
      const value = query.toLowerCase();
      const title = todo.title.toLowerCase();

      return title.includes(value);
    });
  }

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
                setStatus={setStatus}
                status={status}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId !== 0
        && (
          <TodoModal
            todo={todoToModal[0]}
            selectTodo={selectTodo}
          />
        )}
    </>
  );
};
