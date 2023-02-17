/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { findTodo, filterTodos } from './components/functions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filtredByReady, setFiltredByReady] = useState<Filter>(Filter.All);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const selectTodo = findTodo(todos, selectedTodoId);
  const visibleTodos = filterTodos(todos, filtredByReady, query);
  const hasLoading = (isLoading && todos.length === 0) || todos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                ready={filtredByReady}
                onStatusChange={setFiltredByReady}
                query={query}
                onInputChange={setQuery}
              />
            </div>

            <div className="block">
              {hasLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={setSelectedTodoId}
                    selectedId={selectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          selectedTodo={selectTodo!}
          onClose={setSelectedTodoId}
        />
      )}
    </>
  );
};
