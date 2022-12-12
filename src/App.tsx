/* eslint-disable max-len */
import { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  getTodos().then(todo => setTodos(todo));

  const selectedTodo = todos.find(x => x.id === todoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setFilteredTodos={setFilteredTodos}
              />
            </div>

            <div className="block">
              <Loader />

              <TodoList
                todos={filteredTodos}
                selectedTodoId={todoId}
                selectTodo={(todoID) => {
                  setTodoId(todoID);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} />
      )}
    </>
  );
};
