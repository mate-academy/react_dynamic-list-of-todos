/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import { useState, useEffect } from 'react'; // Убрал useCallback
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const getFilterType = (type: string) => {
    setFilterType(type);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const loadTodos = async () => {
    try {
      setIsLoading(true);

      const data = await getTodos();

      if (Array.isArray(data)) {
        setTodoList(data as Todo[]);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const getFilteredTodos = () => {
    let todos = todoList;

    if (filterType === 'active') {
      todos = todos.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
      todos = todos.filter(todo => todo.completed);
    }

    if (query) {
      todos = todos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return todos;
  };

  const loadTodoDetail = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getFilterType={getFilterType}
                handleQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              <Loader isLoading={isLoading} />
              {!isLoading && (
                <TodoList
                  todoList={getFilteredTodos()}
                  loadTodoDetail={loadTodoDetail}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal selectedTodo={selectedTodo} closeModal={closeModal} />
    </>
  );
};
