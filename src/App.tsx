import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SelectedOption } from './types/SelectedOption';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(SelectedOption.all);
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [areLoadingTodos, setAreLoadingTodos] = useState(false);

  useEffect(() => {
    setAreLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setAreLoadingTodos(false));
  }, []);

  const getVisibleTodos = () => {
    let preparedTodos = [...todos];

    if (query.trim()) {
      preparedTodos = preparedTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filter) {
      case SelectedOption.active:
        return preparedTodos.filter(todo => !todo.completed);
      case SelectedOption.completed:
        return preparedTodos.filter(todo => todo.completed);
      default:
        return preparedTodos;
    }
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {areLoadingTodos && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
