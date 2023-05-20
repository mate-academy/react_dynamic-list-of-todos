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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [isLoading, setIsLoading] = useState(true);
  const [openedTodo, setOpenedTodo] = useState<null | Todo>(null);
  const [query, setQuery] = useState('');
  const [todoCategory, setTodosCategory] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
        setVisibleTodos(fetchedTodos);
      })
      .catch((error) => error.message)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let currentCategory: boolean | null;

    if (todoCategory === 'completed') {
      currentCategory = false;
    } else if (todoCategory === 'active') {
      currentCategory = true;
    } else {
      currentCategory = null;
    }

    setVisibleTodos(todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
      && todo.completed !== currentCategory
    )));
  }, [query, todoCategory]);

  const toggleTodoModal = (todo: null | Todo) => {
    if (openedTodo) {
      setOpenedTodo(null);
    } else {
      setOpenedTodo(todo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setTodosCategory={setTodosCategory}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    handleOpenTodo={toggleTodoModal}
                    selectedTodo={openedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {openedTodo && <TodoModal todo={openedTodo} handleCloseTodo={toggleTodoModal} />}
    </>
  );
};
