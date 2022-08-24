/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, FilterBy } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState(FilterBy.NONE);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setLoader(false));
  }, []);

  const clearSelected = useCallback(() => {
    setTodoId(0);
  }, []);

  const getTodoById = todos.find((todo) => todo.id === todoId);

  const filteredToDo = useMemo(() => (
    todos.filter(todo => {
      const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterBy) {
        case FilterBy.ACTIVE:
          return queryFilter && !todo.completed;

        case FilterBy.COMPLETED:
          return queryFilter && todo.completed;

        default:
          return queryFilter;
      }
    })
  ), [query, todos, filterBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loader
                ? (<Loader />)
                : (
                  <TodoList
                    todos={filteredToDo}
                    selected={todoId}
                    selectedTodo={(todo: React.SetStateAction<number>) => {
                      setTodoId(todo);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      { getTodoById
        && <TodoModal todo={(getTodoById)} clear={clearSelected} />}
    </>
  );
};
