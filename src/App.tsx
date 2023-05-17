/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const todosFilter = (
    todosArr: Todo[],
    typeToFilter: string,
    valueToSearch: string,
  ) => {
    const resFilterTodos = todosArr.filter((todo) => {
      return todo.title
        .toLocaleLowerCase()
        .includes(valueToSearch.trim().toLowerCase());
    });

    switch (typeToFilter) {
      case 'completed':
        return resFilterTodos.filter((todo) => todo.completed);

      case 'active':
        return resFilterTodos.filter((todo) => !todo.completed);

      case 'all':
        return resFilterTodos;

      default:
        throw new Error('filtering error');
    }
  };

  const visibleTodos = todosFilter(todos, typeFilter, searchValue);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>

            <div className="block">
              {isError && <h3>An error occurred on load todos</h3>}
              {isLoading && <Loader />}
              {!isLoading && !isError && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectTodo={selectedTodo}
          setSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
