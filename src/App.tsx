/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(loadedTodos => {
        setLoadingTodos(false);
        setTodos(loadedTodos);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const includesQuery = todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      switch (category) {
        case 'active':
          return !todo.completed && includesQuery;

        case 'completed':
          return todo.completed && includesQuery;

        case 'all':
        default:
          return includesQuery;
      }
    });
  }, [category, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                category={category}
                onChangecategory={setCategory}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadingTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
