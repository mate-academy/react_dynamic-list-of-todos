/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterTypeEnum';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState(FilterType.All);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filterType) {
      case FilterType.All:
        filteredTodos = todos;
        break;
      case FilterType.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case FilterType.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo => {
        const queryLower = query.toLowerCase().trim();

        return todo.title.toLowerCase().includes(queryLower);
      });
    }

    return filteredTodos;
  }, [filterType, todos, query]);

  const handleQueryDelete = () => {
    setQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                query={query}
                handleInputChange={handleInputChange}
                handleQueryDelete={handleQueryDelete}
              />
            </div>

            <div className="block">
              {!todos.length ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    handleSelectTodo={handleSelectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
