/* eslint-disable max-len */
import React, { useEffect, useState, useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodosContext } from './components/TodosContext';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(originalTodos);
  const [loading, setLoading] = useState(false);

  const { selectedTodo } = useContext(TodosContext);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((date) => {
        setOriginalTodos(date);
        setVisibleTodos(date);
      })
      .catch(() => setOriginalTodos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodos={(newTodos) => setVisibleTodos(newTodos)}
                originalTodos={originalTodos}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              {!loading && !!visibleTodos.length && (
                <TodoList visibleTodos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
