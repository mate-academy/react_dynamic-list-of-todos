/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectStatus, setSelectStatus] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [todoId, setTodoId] = useState(0);
  const [load, setLoad] = useState(true);

  async function loadingTodosFromServer() {
    const getTodosFromServer = await getTodos();

    setTodos(getTodosFromServer);
    setLoad(false);
  }

  useEffect(() => {
    loadingTodosFromServer();
  }, []);

  const filtredTodos = () => {
    const toFilter = todos.filter((item) => {
      const queryToLowerCase = query.toLowerCase();
      const filterInput = item.title.toLowerCase().includes(queryToLowerCase);

      switch (selectStatus) {
        case 'active':
          return !item.completed && filterInput;
        case 'completed':
          return item.completed && filterInput;
        default:
          return filterInput;
      }
    });

    return toFilter;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                setSelectStatus={setSelectStatus}
              />
            </div>

            <div className="block">
              {load && (
                <Loader />
              )}
              <TodoList
                todos={filtredTodos()}
                setSelectedTodo={setSelectedTodo}
                setSelectedTodoId={setTodoId}
                selectedTodoId={todoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && todoId !== 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setTodoId}
        />
      )}

    </>
  );
};
