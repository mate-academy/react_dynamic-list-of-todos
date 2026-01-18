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
import { User } from './types/User';

export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [todoShow, setTodoShow] = useState<Todo | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(search.trim().toLowerCase());

    let matchesStatus = true;

    if (status === 'active') {
      matchesStatus = !todo.completed;
    }

    if (status === 'completed') {
      matchesStatus = todo.completed;
    }

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSearchChange={setSearch} onStatusChange={setStatus} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={setTodoShow}
                  selectedTodoId={todoShow?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoShow && <TodoModal todoShow={todoShow} onClose={() => setTodoShow(null)} />}
    </>
  );
};
