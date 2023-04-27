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

const getLowerString = (str: string) => {
  return str.toLowerCase();
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filterTodos, setFilterTodos] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const getTodosList = async () => {
    const result = await getTodos();

    setTodos(result);
  };

  useEffect(() => {
    getTodosList();
  }, []);

  const handleChangeFilter = (value: string) => {
    setFilterTodos(value);
  };

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const handleSelectedTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const getFilteredTodos = () => {
    let newTodos = [...todos];

    if (filterTodos === 'active') {
      newTodos = newTodos.filter(todo => !todo.completed);
    }

    if (filterTodos === 'completed') {
      newTodos = newTodos.filter(todo => todo.completed);
    }

    if (query.trim() !== '') {
      newTodos = newTodos.filter(({ title }) => {
        const lowerTitle = getLowerString(title);
        const lowerQuery = getLowerString(query).trim();

        return lowerTitle.includes(lowerQuery);
      });
    }

    return newTodos;
  };

  const visibleTodos = getFilteredTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
                query={query}
                handleChangeFilter={handleChangeFilter}
                handleChangeQuery={handleChangeQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  handleSelectedTodo={handleSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          handleSelectedTodo={handleSelectedTodo}
        />
      )}
    </>
  );
};
