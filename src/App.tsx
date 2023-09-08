/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { ShowTodos } from './types/ShowTodos';
import { getTodos } from './api';
import { StatusTodos } from './types/StatusTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ShowTodos>(ShowTodos.All);
  const [query, setQuery] = useState<null | string>(null);
  const [selectedTodoID, setSelectedTodoID] = useState<null | number>(null);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setIsLoading(false);
      });
  }, []);

  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case StatusTodos.Active:
        setSelectedStatus(ShowTodos.Active);
        break;

      case StatusTodos.Completed:
        setSelectedStatus(ShowTodos.Completed);
        break;

      default:
        setSelectedStatus(ShowTodos.All);
        break;
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => setQuery(null);

  const clearTodo = () => setSelectedTodoID(null);

  const getVisibleTodos = (showTodos: ShowTodos) => {
    switch (showTodos) {
      case ShowTodos.Active:
        return todos.filter(todo => !todo.completed);

      case ShowTodos.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodos = React.useMemo(
    () => getVisibleTodos(selectedStatus),
    [selectedStatus, todos],
  );

  const getFilteredTodos = (filterQuery: null | string) => {
    return filterQuery
      ? visibleTodos.filter(todo => todo.title.toLowerCase()
        .includes(filterQuery.toLowerCase()))
      : visibleTodos;
  };

  const filteredTodos = React.useMemo(
    () => getFilteredTodos(query),
    [query, visibleTodos],
  );

  const todo = todos.find(currentTodo => currentTodo.id === selectedTodoID);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQueryChange={handleQueryChange}
                clearQuery={clearQuery}
                handleFilterSelect={handleFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoID={selectedTodoID}
                    setTodoID={setSelectedTodoID}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} clearTodo={clearTodo} />}
    </>
  );
};
