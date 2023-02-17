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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [sortType, setSortType] = useState('all');
  const [query, setQuery] = useState('');

  const fetchedTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedTodos();
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleHideTodo = () => {
    setSelectedTodo(null);
  };

  const handleSetSortType = (event: string) => {
    setSortType(event);
  };

  const handleSetQuery = (event: string) => {
    setQuery(event);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const prepareTodo = (preparedTodos: Todo[]):Todo[] => {
    let todosForRender = preparedTodos;

    if (query) {
      const lowQuery = query.toLowerCase();

      todosForRender = todosForRender.filter(
        todo => todo.title.toLowerCase().includes(lowQuery),
      );
    }

    if (sortType !== 'all') {
      todosForRender = todosForRender.filter(todo => {
        switch (sortType) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return todo;
        }
      });
    }

    return todosForRender;
  };

  const visibleTodo = prepareTodo(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortType={sortType}
                onSortTodos={handleSetSortType}
                onQuery={handleSetQuery}
                query={query}
                onClear={handleClearQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodo}
                    onSelectTodo={handleSelectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onHideTodo={handleHideTodo} todo={selectedTodo} />
      )}
    </>
  );
};
