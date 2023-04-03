/* eslint-disable max-len */
import {
  useState,
  useEffect,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>(FilterOptions.all);

  useEffect(() => {
    getTodos().then(setTodosFromServer);
  }, []);

  const visibleTodos = useMemo(() => {
    return todosFromServer.filter(todo => {
      const matchedWithSearch = todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      switch (filterOption) {
        case FilterOptions.active:
          return !todo.completed && matchedWithSearch;
        case FilterOptions.completed:
          return todo.completed && matchedWithSearch;
        case FilterOptions.all:
        default:
          return matchedWithSearch;
      }
    });
  }, [filterOption, query, todosFromServer]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                selectedTodos={filterOption}
                onSelectedTodosChange={setFilterOption}
              />
            </div>

            <div className="block">
              {todosFromServer.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    currentTodo={currentTodo}
                    onTodoClick={setCurrentTodo}
                  />
                )
                : <Loader />}

            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal todo={currentTodo} onClose={setCurrentTodo} />}

    </>
  );
};
