/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [isInitialized, setInitialized] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const findSelectedTodo = (id: number) => todos.find(todo => todo.id === id) || null;
  const filterInput = (todo: Todo) => todo.title.toLowerCase().includes(query.toLowerCase());
  const filterStatus = (todo: Todo, todoStatus: string) => {
    switch (todoStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  };

  const visibleTodos = todos
    .filter(filterInput)
    .filter((todo) => filterStatus(todo, status));

  useEffect(() => {
    const loadTodos = () => {
      getTodos().then(todosFromServer => {
        setTodos(todosFromServer);
        setInitialized(true);
      });
    };

    loadTodos();
  }, []);

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
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {
                !isInitialized
                  ? <Loader />
                  : (
                    <>
                      <TodoList
                        todos={visibleTodos}
                        selectedTodoId={todoId}
                        selectTodo={(id: number) => {
                          setTodoId(id);
                          setSelectedTodo(findSelectedTodo(id));
                        }}
                      />
                    </>
                  )
              }
            </div>
          </div>
        </div>
        {todoId && (
          <TodoModal
            todo={selectedTodo}
            onClose={() => {
              setTodoId(null);
            }}
          />
        )}
      </div>
    </>
  );
};
