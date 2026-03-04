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
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [modalId, setModalId] = useState<number | null>(null);

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const filtredTodos = todos.filter(t => {
    if (status === 'active' && t.completed) {
      return false;
    }

    if (status === 'completed' && !t.completed) {
      return false;
    }

    if (query && !t.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  const selectedTodo = filtredTodos.find(t => t.id === modalId);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setDataLoaded(true));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onClearQuery={() => setQuery('')}
                onChangeQuery={newQuery => setQuery(newQuery)}
                onChangeStatus={newStatus => setStatus(newStatus)}
              />
            </div>

            <div className="block">
              {!dataLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtredTodos}
                  modalId={modalId}
                  onSelectModalId={userId => setModalId(userId)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalId !== null && (
        <TodoModal
          onSelectModalId={userId => setModalId(userId)}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
