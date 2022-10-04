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
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const getTodosFromApi = async () => {
      const response = await getTodos();

      setTodos(response);
      setFiltredTodos(response);
    };

    getTodosFromApi();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} filter={setFiltredTodos} />
            </div>

            <div className="block">
              {(!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filtredTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
