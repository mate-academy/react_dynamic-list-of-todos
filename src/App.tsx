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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shownTodo, setShownTodo] = useState<number | null>(null);
  const [selectValue, setSelectValue] = useState<string>(Filter.all);
  const [appliedQuery, setAppliedQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  const filterBySelect = (todosFromServer: Todo[]) => {
    return todosFromServer.filter((todo: Todo) => {
      switch (selectValue) {
        case Filter.completed: return todo.completed;
        case Filter.active: return !todo.completed;
        default: return todo;
      }
    });
  };

  useMemo(async () => {
    const todosFromServer = await getTodos();

    setTodos(filterBySelect(todosFromServer));
  }, [selectValue]);

  useMemo(async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer.filter((todo: Todo) => {
      return todo.title.toLowerCase().includes(appliedQuery.toLowerCase());
    }));
  }, [appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                setSelectValue={(param: string) => setSelectValue(param)}
                setAppliedQuery={setAppliedQuery}
              />
              <button
                type="button"
                className="button"
                onClick={() => setTodos(shuffle(todos))}
              >
                Randomize
              </button>
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
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
          unselectTodo={() => setShownTodo(null)}
        />
      )}

    </>
  );
};
