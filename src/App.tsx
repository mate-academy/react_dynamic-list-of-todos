/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const debounce = (f: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [applyQuery, setApplyQuuery] = useState('');

  const apliedQuery = useCallback(
    debounce(setApplyQuuery, 1000),
    [],
  );

  const onSelectTodo = (selectId: number) => {
    setSelectedTodoId(todos.find(todo => todo.id === selectId)?.id.toString() || '');
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  // const visibleTodos = useMemo(() => {
  //   return filteredTodos.filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  // }, [filteredTodos, query]);

  const visibleTodos = (() => {
    return todos
      .filter(todo => {
        switch (filterBy) {
          case 'active': {
            return !todo.completed;
          }

          case 'completed': {
            return todo.completed;
          }

          default:
            return todo;
        }
      })
      .filter(todo => todo.title.toLocaleLowerCase().includes(applyQuery.toLocaleLowerCase()));
  })();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onApplyQuery={apliedQuery}
                onSetQuery={setQuery}
                filter={filterBy}
                onFilter={setFilterBy}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onSelectTodo={onSelectTodo}
              />
              {!todos.length && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          onSelectTodo={onSelectTodo}
        />
      )}
    </>
  );
};
