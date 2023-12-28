/* eslint-disable max-len */
import {
  FC, useCallback, useEffect, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo, FilterType } from './types';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const allTodos = await getTodos();

        setTodos(allTodos);
      } catch (error) {
        setErrorMessage(`Failed to fetch todos: ${error}`);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    let filteredTodos = todos;

    if (todos) {
      switch (filterType) {
        case 'active':
          filteredTodos = todos.filter(todo => !todo.completed);
          break;
        case 'completed':
          filteredTodos = todos.filter(todo => todo.completed);
          break;
        default:
          filteredTodos = todos;
          break;
      }

      if (query.trim().length) {
        filteredTodos = filteredTodos
          .filter(todo => todo.title.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()));
      }

      setVisibleTodos(filteredTodos);
    }
  }, [filterType, query, todos]);

  const handleTodoSelected = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleFilterChange = useCallback((newFilterType: FilterType) => {
    if (newFilterType === filterType) {
      return;
    }

    setFilterType(newFilterType);
  }, [filterType]);

  const handleQueryChange = useCallback((input: string) => {
    setQuery(input);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                queryValue={query}
              />
            </div>

            {
              errorMessage && <p>{errorMessage}</p>
            }

            <div className="block">
              {
                todos
                  ? (
                    <TodoList
                      todos={visibleTodos}
                      onTodoSelect={handleTodoSelected}
                      selectedId={selectedTodo?.id}
                    />
                  )
                  : !errorMessage && <Loader />
              }
            </div>
          </div>
        </div>
      </div>
      {
        selectedTodo && (
          <TodoModal
            selectedTodo={selectedTodo}
            onModalClose={handleModalClose}
          />
        )
      }
    </>
  );
};
