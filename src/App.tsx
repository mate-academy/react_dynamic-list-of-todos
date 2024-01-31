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
import { handleTodoFilter } from './services/handleTodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterOptionValue, setFilterOptionValue] = useState('all');
  const [filterInputValue, setFilterInputValue] = useState('');

  useEffect(() => {
    setTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setTodosLoading(false));
  }, []);

  const visibleTodos = handleTodoFilter(todos, filterOptionValue, filterInputValue);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterOptionValue={setFilterOptionValue}
                filterInputValue={filterInputValue}
                setFilterInputValue={setFilterInputValue}
              />
            </div>

            <div className="block">
              {todosLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
