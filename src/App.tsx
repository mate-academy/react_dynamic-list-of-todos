/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './services/getTodos';
import { TypeTodos } from './types/type';

function getVisibleTodos(todos: Todo[], query: string, filter: TypeTodos) {
  const fixQuery = query.toLowerCase();
  let result = [...todos];

  if (filter) {
    result = result.filter(todo => {
      switch (filter) {
        case TypeTodos.ACTIVE:
          return !todo.completed;

        case TypeTodos.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    });
  }

  if (query.trim()) {
    result = result.filter(todo => todo.title.toLowerCase().includes(fixQuery));
  }

  return result;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [typeSelect, setTypeSelect] = useState<TypeTodos>(TypeTodos.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
      });
  }, []);

  const visibleTodos = getVisibleTodos(todos, query, typeSelect);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTypeSelect={setTypeSelect}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
