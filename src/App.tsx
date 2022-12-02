import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function isIncludesQuery(todoTitle: string, query: string) {
  return todoTitle.toLowerCase().includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const handleSelectTodo = (todoId: number | null) => (
    todoId
      ? (setSelectedTodo(todos.find(todo => todo.id === todoId) || null))
      : setSelectedTodo(null)
  );

  const requestTodos = async () => (
    setInitialTodos(await getTodos())
  );

  useEffect(() => {
    requestTodos();
  }, []);

  const handleVisibleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVisibleTodos(event.target.value);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const getFilteredTodos = () => {
    return initialTodos.filter(todo => {
      switch (visibleTodos) {
        case 'all': {
          return isIncludesQuery(todo.title, query);
        }

        case 'active': {
          return !todo.completed && isIncludesQuery(todo.title, query);
        }

        case 'completed': {
          return todo.completed && isIncludesQuery(todo.title, query);
        }

        default:
          return todo.title;
      }
    });
  };

  useEffect(() => {
    setTodos(getFilteredTodos);
  }, [initialTodos, query, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={visibleTodos}
                onSelectStatus={handleVisibleStatus}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedId={selectedTodo?.id}
                  onSelected={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleSelectTodo}
        />
      )}
    </>
  );
};
