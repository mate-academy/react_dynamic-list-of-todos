/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { MemoTodoList } from './components/TodoList';
import { MemoTodoFilter } from './components/TodoFilter';
import { MemoTodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filterTodos } from './services/filteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [selQuery, setSelQuery] = useState('all');

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
    });
  }, []);

  const handleModal = () => {
    setUserTodo(null);
  };

  const filter = useMemo(() => {
    return filterTodos(todos, selQuery, inputQuery);
  }, [todos, selQuery, inputQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <MemoTodoFilter
                onSelect={query => setSelQuery(query)}
                onInput={query => setInputQuery(query)}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <MemoTodoList
                  todos={filter}
                  onSelect={todo => setUserTodo(todo)}
                  buttonSwitch={userTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userTodo && <MemoTodoModal todo={userTodo} handleModal={handleModal} />}
    </>
  );
};
