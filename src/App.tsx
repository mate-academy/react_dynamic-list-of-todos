/* eslint-disable max-len */
import React, {
  useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { shuffle } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shownTodo, setShownTodo] = useState<number>(0);
  const [filterByStatus, setFilterByStatus] = useState<string>('all');
  const [appliedQuery, setAppliedQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  useMemo(() => setVisibleTodos(todos.filter((todo: Todo) => {
    switch (filterByStatus) {
      case 'completed': return todo.completed;
      case 'active': return !todo.completed;
      default: return todo;
    }
  })), [filterByStatus, todos]);

  useMemo(() => setVisibleTodos(todos.filter((todo: Todo) => {
    return todo.title.toLowerCase().includes(appliedQuery.toLowerCase());
  })), [appliedQuery, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={(param: string) => setFilterByStatus(param)}
                setAppliedQuery={setAppliedQuery}
              />
              <button
                type="button"
                className="button"
                onClick={() => setVisibleTodos(shuffle(visibleTodos))}
              >
                Randomize
              </button>
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={shownTodo}
                selectTodo={(todoId) => setShownTodo(todoId)}
              />
            </div>
          </div>
        </div>
      </div>

      {shownTodo && (
        <TodoModal
          todo={todos[shownTodo - 1]}
          unselectTodo={() => {
            setShownTodo(0);
          }}
        />
      )}

    </>
  );
};
