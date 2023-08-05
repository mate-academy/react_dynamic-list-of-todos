/* eslint-disable max-len */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterContext, SelectedTodoContext, Status } from './Store';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const { selectedTodo } = useContext(SelectedTodoContext);
  const { filter } = useContext(FilterContext);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let result = todos;

    if (query) {
      result = result.filter(todo => todo.title.toLowerCase().includes(query));
    }

    switch (filter) {
      case Status.Active: {
        return result.filter(todo => !todo.completed);
      }

      case Status.Completed: {
        return result.filter(todo => todo.completed);
      }

      default: {
        return result;
      }
    }
  }, [query, todos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={(value) => setQuery(value.toLowerCase())}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};

// selected todo vinesti v store, showModal v store sdelat, loading user vinesti v TodoModal i func loadUser zapuskat tam cherez useEffect, po knopke na todoIteme prosto menyat showModal
