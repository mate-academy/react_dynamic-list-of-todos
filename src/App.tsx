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
import { SelectTodos } from './types/Select';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState(SelectTodos.All);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
    });
  }, []);

  const handleModal = () => {
    setUserTodo(null);
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, selectQuery, inputQuery);
  }, [todos, selectQuery, inputQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <MemoTodoFilter
                onSelect={setSelectQuery}
                onInput={setInputQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <MemoTodoList
                  todos={filteredTodos}
                  onSelect={setUserTodo}
                  selectedTodo={userTodo}
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
