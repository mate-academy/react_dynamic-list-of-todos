/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [hasError, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodos() {
      try {
        const todosData = await getTodos();

        setTodos(todosData);
      } catch (error) {
        setError('An error occurred while loading the goods.');
      }
    }

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let searchedTodos = [...todos];

    if (query) {
      searchedTodos = searchedTodos.filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase().trim())));
    }

    switch (selectedStatus) {
      case ('active'): {
        searchedTodos = searchedTodos.filter(todo => !todo.completed);
        break;
      }

      case ('completed'): {
        searchedTodos = searchedTodos.filter(todo => todo.completed);
        break;
      }

      default: break;
    }

    return searchedTodos;
  }, [query, selectedStatus, todos]);

  const handleSelectTodo = (id: number) => {
    const todo = todos.find(todoItem => todoItem.id === id);

    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                onSelectTodo={handleSelectTodo}
                selectedId={selectedTodo?.id}
              />
              {!todos.length && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {hasError
        && (
          <Error hasError={hasError} onModalClose={() => setSelectedTodo(undefined)} />
        )}

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(undefined)} />}
    </>
  );
};
