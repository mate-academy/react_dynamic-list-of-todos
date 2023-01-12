import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const handleFilter = (
    arrOfTodos: Todo[],
    filterType: string,
    queryValue: string,
  ) => {
    const queryResult = arrOfTodos.filter(
      todo => todo.title.toLowerCase().includes(
        queryValue.trim().toLowerCase(),
      ),
    );
    const completedTodos = queryResult.filter(todo => todo.completed);
    const activeTodos = queryResult.filter(todo => !todo.completed);

    switch (filterType) {
      case 'active':
        return activeTodos;

      case 'completed':
        return completedTodos;

      default:
        return !queryResult ? arrOfTodos : queryResult;
    }
  };

  const visibleTodos = handleFilter(todos, filter, query);

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
      setLoading(false);
    });
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
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
