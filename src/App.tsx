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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setVisibleTodos(data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setVisibleTodos={setVisibleTodos} />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && visibleTodos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onClickShowModal={() => setShowModal(true)}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClickHideModal={() => {
            setShowModal(false);
            setSelectedTodoId(null);
          }}
        />
      )}
    </>
  );
};
