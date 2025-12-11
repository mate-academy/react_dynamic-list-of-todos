/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import type { Todo } from './types/Todo';
export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  // const [filteredModalTodo, setFilteredModalTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos', error);
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   if (!modal || !selectedTodoId) {
  //     return;
  //   }

  //   getTodo(selectedTodoId)
  //     .then(setFilteredModalTodo)
  //     .catch(error => {
  //       //eslint-disable-next-line no-console
  //       console.error('Error fetching Todo', error);
  //       setFilteredModalTodo(null);
  //     });
  // }, [selectedTodoId, modal]);

  const filteredModalTodo =
    todos.find(todo => todo.id === selectedTodoId) || null;

  const filtredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLocaleLowerCase()
      .includes(searchVal.toLocaleLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                input={searchVal}
                onSearch={setSearchVal}
                selected={status}
                onSelected={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todosData={filtredTodos}
                  onShowModal={setModal}
                  selectedTodoId={setSelectedTodoId}
                  isModalOpen={modal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal && filteredModalTodo && (
        <TodoModal
          switchMode={modal}
          onSwitch={setModal}
          onSelectTodoId={filteredModalTodo}
        />
      )}
    </>
  );
};
