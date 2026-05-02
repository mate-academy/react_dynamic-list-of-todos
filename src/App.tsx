/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTodoLoaded, setIsTodoLoaded] = useState(false);
  const [isOpenTodo, setIsOpenTodo] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const visibleTodos = todos
    .filter(todo => {
      if (sortType === 'active') {
        return todo.completed === false;
      }

      if (sortType === 'completed') {
        return todo.completed === true;
      }

      return todo;
    })
    .filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

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
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              <Loader isLoaded={isLoaded} />
              {isLoaded && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                  setIsOpenTodo={setIsOpenTodo}
                  setIsTodoLoaded={setIsTodoLoaded}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todos={todos}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
        isTodoLoaded={isTodoLoaded}
        isOpenTodo={isOpenTodo}
        setIsOpenTodo={setIsOpenTodo}
        setIsTodoLoaded={setIsTodoLoaded}
      />
    </>
  );
};
