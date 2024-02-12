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
import { getFilteredTodos } from './utils/getFilteredTodos';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>({ status: 'all', title: '' });

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const resetTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} />
            </div>

            <div className="block">
              {loading ? <Loader /> : (
                <TodoList todos={filteredTodos} selectedTodoId={selectedTodo?.id} onTodoSelect={handleTodoSelect} />
              )}
            </div>
          </div>
        </div>
      </div>
      {!!selectedTodo && <TodoModal selectedTodo={selectedTodo} onResetTodo={resetTodo} />}
    </>
  );
};
