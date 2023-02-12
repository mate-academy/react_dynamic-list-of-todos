import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterTypes } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterTypes.All);
  const [query, setQuery] = useState('');
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then((loadedTodos) => setTodos(loadedTodos))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let preparedTodos = todos;

    switch (filterType) {
      case FilterTypes.Active:
        preparedTodos = todos.filter(todo => !todo.completed);
        break;

      case FilterTypes.Completed:
        preparedTodos = todos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return query
      ? preparedTodos.filter(todo => (
        todo.title.toLocaleLowerCase().includes(query.toLowerCase())
      ))
      : preparedTodos;
  }, [todos, filterType, query]);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [selectedTodoId, todos]);

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
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodoId={setSelectedTodoId} />
      )}
    </>
  );
};
