/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const filteredTodos = () => {
    let filteredTodosArr = [...todos];

    if (filterStatus === 'completed') {
      filteredTodosArr = filteredTodosArr.filter((todo) => todo.completed);
    }

    if (filterStatus === 'active') {
      filteredTodosArr = filteredTodosArr.filter((todo) => !todo.completed);
    }

    if (query) {
      filteredTodosArr = filteredTodosArr.filter((todo) => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return filteredTodosArr;
  };

  const handleFilterSelect = (filter: string) => {
    setFilterStatus(filter);
  };

  const handleQueryChange = (queryStr: string) => {
    setQuery(queryStr);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={filterStatus}
                onFilterSelect={handleFilterSelect}
                onQueryChange={handleQueryChange}
                onQueryReset={handleQueryReset}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={filteredTodos()}
                    selectedTodoId={selectedTodo?.id}
                    onSelectTodo={handleSelectingTodo}
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
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
