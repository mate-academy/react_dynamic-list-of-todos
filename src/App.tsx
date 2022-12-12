/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [showingTodo, setShowingTodo] = useState<Todo | null>(null);
  const [selectedTodos, setSelectedTodos] = useState('all');

  useEffect(() => {
    getTodos()
      .then(loadingTodos => {
        setLoadedTodos(loadingTodos);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return loadedTodos.filter(todo => {
      const queried = todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      switch (selectedTodos) {
        case 'completed':
          return todo.completed && queried;

        case 'active':
          return !todo.completed && queried;

        case 'all':
        default:
          return queried;
      }
    });
  }, [selectedTodos, query, loadedTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedTodos={selectedTodos}
                onChangeSelectedTodos={setSelectedTodos}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadedTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    showingTodo={showingTodo}
                    onShowingTodo={setShowingTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {showingTodo && (
        <TodoModal
          showingTodo={showingTodo}
          onShowingTodo={setShowingTodo}
        />
      )}
    </>
  );
};
