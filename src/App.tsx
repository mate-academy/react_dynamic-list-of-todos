/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoadTodos, setIsLoadTodos] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoadTodos(true);
    getTodos().then(setTodos).finally(() => setIsLoadTodos(false));
  }, []);

  const filterTodos = () => {
    let todosCopy = [...todos];

    if (query) {
      todosCopy = todosCopy
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filter) {
      case Status.Active:
        todosCopy = todosCopy.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        todosCopy = todosCopy.filter(todo => todo.completed);
        break;
      case Status.All:
        break;
      default:
        throw new Error('not filter');
    }

    return todosCopy;
  };

  const todosVisible:Todo[] = filterTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}

              />
            </div>

            <div className="block">
              {isLoadTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={todosVisible}
                    selectTodo={selectTodo}
                    setSelectTodo={setSelectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal
          selectTodo={selectTodo}
          setSelectTodo={setSelectTodo}
        />
      )}
    </>
  );
};
