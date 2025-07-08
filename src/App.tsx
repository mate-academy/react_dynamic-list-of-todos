/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFiltred, setIsFiltred] = useState('all');
  const [isSearch, setIsSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
    getTodos().then(setTodos);
  }, []);

  const filtredToDos = todos
    .filter(todo => {
      if (isFiltred === 'completed') {
        return todo.completed;
      }

      if (isFiltred === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.includes(isSearch));

  const selectedTodo = filtredToDos.filter(todo => todo.id === id);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={setIsFiltred}
                onSearch={setIsSearch}
                onReset={() => setIsSearch('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filtredToDos} onShow={setShow} onId={setId} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal show={show} onClose={setShow} user={selectedTodo[0]} />
    </>
  );
};
