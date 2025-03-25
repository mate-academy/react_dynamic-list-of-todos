/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

export enum TodoStatus {
  DEFAULT = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}
// eslint-disable-next-line
function debounce(Callback: Function, delay: number) {
  let timerId = 0;
  //eslint-disable-next-line
  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      Callback(...args);
    }, delay);
  };
}

const getFilteredTodos = (
  todos: Todo[],
  inputQuery: string,
  selectQuery: string,
) => {
  let filteredTodos = [...todos];

  if (inputQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(inputQuery.toLowerCase().trim()),
    );
  }

  if (selectQuery !== TodoStatus.DEFAULT) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (selectQuery) {
        case TodoStatus.ACTIVE:
          return todo.completed === false;
        case TodoStatus.COMPLETED:
          return todo.completed === true;
        default:
          return true;
      }
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  const [isLoading, setIsloading] = useState(true);

  const [inputQuery, setInputQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.DEFAULT);

  const [appliedQuery, setAppliedQuery] = useState('');
  const applyInputQuery = useCallback(debounce(setAppliedQuery, 300), []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, appliedQuery, todoStatus);
  }, [appliedQuery, todoStatus, todos]);

  useEffect(() => {
    getTodos()
      .then((todosFromServer: Todo[]) => {
        setTodos(todosFromServer);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsloading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={inputQuery}
                onSelect={setTodoStatus}
                onInput={applyInputQuery}
                setInputField={setInputQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectTodo}
                  setSelectTodo={setSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal selectedTodo={selectTodo} setSelectTodo={setSelectTodo} />
      )}
    </>
  );
};
