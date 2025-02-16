/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getPreparedTodos } from './utils/getPreparedTodos';
import { getTodoById } from './utils/getTodoById';
import { CompletionQuery } from './types/CompletionQuery';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [completionQuery, setCompletionQuery] = useState<CompletionQuery>(
    CompletionQuery.All,
  );
  const [loading, setLoading] = useState(false);

  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  const filteredTodos = useMemo(
    () => getPreparedTodos(todos, { searchQuery, completionQuery }),
    [todos, searchQuery, completionQuery],
  );

  const handleResetSelectedTodoId = () => setSelectedTodoId(0);

  const selectedTodo = getTodoById(filteredTodos, selectedTodoId);

  const handleGetTodos = () => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  };

  useEffect(handleGetTodos, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                completionQuery={completionQuery}
                onAddSearchQuery={setSearchQuery}
                onAddCompletionQuery={setCompletionQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  onSelect={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal todo={selectedTodo} onClose={handleResetSelectedTodoId} />
      )}
    </>
  );
};
