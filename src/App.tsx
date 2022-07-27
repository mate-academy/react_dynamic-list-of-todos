/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { SelectOptions } from './types/Select_otions';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    (async () => {
      await getTodos().then(todos => {
        setTodosFromServer(todos);
        setFilteredTodos(todos);
      });
      setIsLoaded(false);
    })();
  }, []);

  const todoFilter = (query: string, option: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (option) {
        case SelectOptions.ALL:
          return todo.title.includes(query);

        case SelectOptions.ACTIVE:
          return !todo.completed && todo.title.includes(query);

        case SelectOptions.COMPLETED:
          return todo.completed && todo.title.includes(query);

        default:
          return undefined;
      }
    });

    setFilteredTodos(todos);
  };

  const idSelector = (id: number) => setSelectedTodoId(id);
  const modalTodo = filteredTodos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todoFilter={todoFilter} />
            </div>

            <div className="block">
              {isLoaded
                ? <Loader />
                : <TodoList todos={filteredTodos} selectTodo={idSelector} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && modalTodo
        && <TodoModal todo={modalTodo} selectUser={idSelector} />}
    </>
  );
};
