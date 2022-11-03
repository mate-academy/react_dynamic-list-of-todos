/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType | string>(FilterType.ALL);

  const filterTodos = () => {
    const filteredTodos = todos.filter(todo => {
      const includesQuery = todo.title.toLowerCase()
        .includes(query.toLowerCase());

      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed && includesQuery;
        case FilterType.COMPLETED:
          return todo.completed && includesQuery;
        default:
          return includesQuery;
      }
    });

    return filteredTodos;
  };

  useEffect(() => {
    const getTodosFromApi = async () => {
      try {
        const response = await getTodos();

        setTodos(response);
        setIsLoaded(true);
      } catch (error) {
        throw new Error('Error on loading todos');
      }
    };

    getTodosFromApi();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {(isLoaded)
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    selectTodo={setSelectedTodo}
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
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
