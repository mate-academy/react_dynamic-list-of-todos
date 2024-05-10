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
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [currentModal, setCurrentModal] = useState({
    userId: 0,
    id: 0,
    title: '0',
    completed: false,
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        return todosFromServer.filter(todo =>
          todo.title.toLowerCase().includes(search.toLowerCase()),
        );
      })
      .then(todosBySearch => {
        if (filter === 'active') {
          return todosBySearch.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
          return todosBySearch.filter(todo => todo.completed);
        } else {
          return todosBySearch;
        }
      })
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [filter, search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={setFilter} search={setSearch} />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos as Todo[]}
                  setCurrentModal={setCurrentModal}
                  currentModal={currentModal}
                />
              )}

              {!loading && todos.length === 0 && (
                <p className="title is-5">There are no todos</p>
              )}

              {!loading && currentModal.userId !== 0 && (
                <TodoModal
                  currentModal={currentModal as Todo}
                  setCurrentModal={setCurrentModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
