/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FiterTodo } from './types/FilterTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTodo = todos.find(({ id }) => id === selectedTodoId) || null;

  const closeModalWindow = () => {
    setSelectedTodoId(0);
  };

  const handleSelectFilter = (value: string) => {
    setSelectedFilter(value);
  };

  const handleQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectTodo = (value: number) => {
    setSelectedTodoId(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todo = await getTodos();

        setTodos(todo);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  let visibleTodos = useMemo(() => {
    switch (selectedFilter) {
      case FiterTodo.ALL:
        return todos;

      case FiterTodo.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FiterTodo.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return [];
    }
  }, [todos, selectedFilter]);

  visibleTodos = visibleTodos.filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleSelectFilter}
                searchQuery={searchQuery}
                onChange={handleQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onTodoSelection={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={closeModalWindow}
        />
      )}
    </>
  );
};
