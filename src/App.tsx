/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  // const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(todosFromServ => setTodos(todosFromServ));
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [todos, selectedTodoId]);

  // const visibleTodos = useMemo((), [todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    onSelectedTodoIdChange={setSelectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodoIdChange={setSelectedTodoId}
        />
      )}
    </>
  );
};
