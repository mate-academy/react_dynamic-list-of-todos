/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const allTodos = await getTodos();
        let filteredTodos: Todo[] | null = null;

        switch (filterType) {
          case 'all':
            filteredTodos = allTodos;
            break;
          case 'active':
            filteredTodos = allTodos.filter(todo => !todo.completed);
            break;
          case 'completed':
            filteredTodos = allTodos.filter(todo => todo.completed);
            break;
          default:
            filteredTodos = allTodos;
            break;
        }

        if (query.trim().length) {
          filteredTodos = filteredTodos
            .filter(todo => todo.title.toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()));
        }

        setTodos(filteredTodos);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos:', error);
      }
    };

    loadTodos();
  }, [filterType, query]);

  const handleTodoSelected = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleFilterChange = (newFilterType: FilterType) => {
    if (newFilterType === filterType) {
      return;
    }

    setFilterType(newFilterType);
  };

  const handleQueryChange = (input: string) => {
    setQuery(input);
  };

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

            <div className="block">
              {
                todos
                  ? (
                    <TodoList
                      todos={todos}
                      onTodoSelect={handleTodoSelected}
                      selectedId={selectedTodo?.id}
                    />
                  )
                  : <Loader />
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
