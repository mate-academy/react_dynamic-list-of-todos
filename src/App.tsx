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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showComponent, setShowComponent] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  const handleSearchTextChange = (status: string) => {
    setSearchText(status);
  };

  useEffect(() => {
    const newFilteredTodos = todos.filter(todo => {
      const { completed } = todo;

      switch (filterStatus) {
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    }).filter(todo => {
      return todo.title.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredTodos(newFilteredTodos);
  }, [todos, filterStatus, searchText]);

  const openTodos = (todoId: number) => {
    setShowComponent(true);
    const foundTodo = todos.find(todo => todo.id === todoId);

    if (foundTodo) {
      setSelectedTodo(foundTodo);
    }
  };

  const closeTodos = () => {
    setShowComponent(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
        setFilteredTodos(loadedTodos);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }

        setIsLoading(false);
      }
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
              <TodoFilter handleFilterChange={handleFilterChange} handleSearchTextChange={handleSearchTextChange} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={filteredTodos} errorMessage={errorMessage} handleClick={openTodos} selectedTodo={selectedTodo} />
            </div>
          </div>
        </div>
      </div>

      {showComponent && selectedTodo && <TodoModal todo={selectedTodo} handleClick={closeTodos} />}
    </>
  );
};
