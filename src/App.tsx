/* eslint-disable max-len */
//#region imports
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { CompletedStatus } from './types/Status';
//#endregion

export const App: React.FC = () => {
  //#region states
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedStatus, setCompletedStatus] = useState(CompletedStatus.all);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  //#endregion

  useEffect(() => {
    setLoading(true);

    getTodos(completedStatus)
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, [completedStatus]);

  const filteredTodos = useMemo((): Todo[] => {
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                changeQuery={setQuery}
                changeStatus={setCompletedStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                changeSelectedTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id || null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} changeSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
