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
import { FilteringMethod } from './types/FilteringMethod';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [isTodosLoaded, setIsTodosLoaded] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [searchField, setSearchField] = useState('');
  const [filteringMethod, setFilteringMethod]
    = useState<FilteringMethod>(FilteringMethod.All);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const response = await getTodos();

        setTodos(response);
      } catch (error) {
        throw new Error('Loading error!');
      }

      setIsTodosLoaded(false);
    };

    getTodosFromServer();
  }, []);

  const findTodo = (id: number) => {
    return todos.find(todo => todo.id === id) || todos[0];
  };

  useEffect(() => {
    let todosCopy = [...todos];

    switch (filteringMethod) {
      case FilteringMethod.Completed:
        todosCopy = todosCopy.filter(todo => {
          return todo.completed;
        });
        break;

      case FilteringMethod.Active:
        todosCopy = todosCopy.filter(todo => {
          return !todo.completed;
        });
        break;

      default:
        break;
    }

    if (searchField) {
      const validSearchField = searchField.toLowerCase();

      todosCopy = todosCopy.filter(todo => {
        return todo.title.toLowerCase().includes(validSearchField);
      });
    }

    setVisibleTodos(todosCopy);
  }, [filteringMethod, todos, searchField]);

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
                    todoId={todoId}
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
