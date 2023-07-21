import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todoModal, setTodoModal] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosAreLoaded, setIsTodosAreLoaded] = useState(false);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setNewTodos={setTodos}
                setIsTodosAreLoaded={setIsTodosAreLoaded}
              />
            </div>

            <div className="block">
              {!isTodosAreLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={todoModal}
                  setSelectedTodo={setTodoModal}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {todoModal && (
        <TodoModal
          todo={todoModal}
          closeTodoModal={() => setTodoModal(null)}
        />
      )}
    </>
  );
};
