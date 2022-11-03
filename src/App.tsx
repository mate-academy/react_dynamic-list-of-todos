/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [isTodosLoaded, setIsTodosLoaded] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [searchField, setSearchField] = useState('');
  const [filteringMethod, setFilteringMethod] = useState('all');

  useEffect(() => {
    const getTodosFromServer = async () => {
      const response = await getTodos();

      setTodos(response);
      setIsTodosLoaded(false);
    };

    getTodosFromServer();
  }, []);

  const findTodo = (id: number) => {
    return todos.find(todo => todo.id === id) || todos[0];
  };

  useEffect(() => {
    switch (filteringMethod) {
      case 'all':
        setVisibleTodos(todos.filter(todo => {
          return todo.title.toLowerCase().includes(searchField.toLowerCase());
        }));

        break;

      case 'completed':
        setVisibleTodos(todos.filter(todo => {
          return todo.completed;
        }));

        break;

      case 'active':
        setVisibleTodos(todos.filter(todo => {
          return !todo.completed;
        }));

        break;

      default:
        break;
    }
  }, [filteringMethod, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchField={searchField}
                setSearchField={setSearchField}
                setFilteringMethod={setFilteringMethod}
              />
            </div>

            <div className="block">
              {isTodosLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    setTodoId={setTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0
      && (
        <TodoModal
          currentTodo={findTodo(todoId)}
          isUserLoaded={isUserLoaded}
          setIsUserLoaded={setIsUserLoaded}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
