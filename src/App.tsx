/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterOption, setFilterOption] = useState<string>(Filter.All);
  const [searchTodo, setSearchTodo] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
        setLoading(false);
      });
  }, []);

  const selectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const handleFilter = (value: string) => {
    setFilterOption(value);
  };

  const handleSearch = (value: string) => {
    setSearchTodo(value);
  };

  const getFilteredTodos = () => {
    let filteredTodos = todos;

    switch (filterOption) {
      case Filter.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case Filter.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      case Filter.All:
      default:
        filteredTodos = todos;
    }

    return filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(searchTodo.toLowerCase());
    });
  };

  const filteredTodos = useMemo(getFilteredTodos, [todos, filterOption, searchTodo]);

  const selectedTodo = filteredTodos.find(todo => todo.id === selectedTodoId) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleFilter}
                onSearch={handleSearch}
                selectionOption={filterOption}
                searchTodo={searchTodo}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectTodo={selectTodo}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectTodo={selectTodo}
        />
      )}
    </>
  );
};
