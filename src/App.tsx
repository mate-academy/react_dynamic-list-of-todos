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
import { Status } from './types/Status';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosStatus, setTodosStatus] = useState(Status.All);

  useEffect(() => {
    getTodos()
      .then(setLoadedTodos);
  }, []);

  const visibleTodos = useMemo(() => {
    return loadedTodos.filter(todo => {
      const queried = todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      switch (todosStatus) {
        case Status.Completed:
          return todo.completed && queried;

        case Status.Active:
          return !todo.completed && queried;

        case Status.All:
        default:
          return queried;
      }
    });
  }, [todosStatus, query, loadedTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedTodos={todosStatus}
                onChangeSelectedTodos={setTodosStatus}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadedTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                )
                : <Loader />}
              {loadedTodos.length === 0 && (
                <p>No todos yet. You can rest for now!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          showingTodo={selectedTodo}
          onShowingTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
