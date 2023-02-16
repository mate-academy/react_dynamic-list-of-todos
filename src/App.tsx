/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { debounce } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [apllyq, setApllyq] = useState('');

  let visibleTodos = todos;

  const modalTodo = visibleTodos.filter(todo => todo.id === selectedTodoId);

  const lowQuery = apllyq.toLowerCase();

  const isMatchingTodos = (!query)
    ? <Loader />
    : <p>Nothing is matching</p>;

  const selectTodo = (id: number) => {
    if (selectedTodoId !== id) {
      setSelectedTodoId(id);
    } else {
      setSelectedTodoId(0);
    }
  };

  const fetchTodos = async () => {
    const todoFromServer = await getTodos();

    setTodos(todoFromServer);
  };

  useEffect(() => {
    fetchTodos();
    fetchTodos().catch(Error);
  }, []);

  switch (status) {
    case ('all'):
      visibleTodos = todos;
      break;

    case ('active'):
      visibleTodos = todos.filter(todo => !todo.completed);
      break;
    case ('completed'):
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const debouncedChangeHandler = useCallback(
    debounce(setApllyq, 1000),
    [],
  );

  if (apllyq) {
    visibleTodos = visibleTodos.filter(todo => {
      return todo.title.toLowerCase().includes(lowQuery);
    });
  }

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
                status={status}
                setStatus={setStatus}
                debounceQuery={debouncedChangeHandler}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : (isMatchingTodos)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0
        && (
          <TodoModal
            todo={modalTodo[0]}
            selectTodo={selectTodo}
          />
        )}
    </>
  );
};
