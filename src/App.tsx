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

// console.log('todos', getTodos());
// console.log('user', getUser(1));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodoId, setSelectedTodoId] = useState(0);
  const [isLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

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
              {isLoading && <Loader />}
              {todos.length > 0
               && (
                 <TodoList
                   todos={todos}
                   onSelectTodo={(todoId) => setSelectedTodoId(todoId)}
                   selectTodoId={selectTodoId}
                 />
               )}
            </div>
          </div>
        </div>
      </div>

      {selectTodoId !== 0 && <TodoModal />}
    </>
  );
};
