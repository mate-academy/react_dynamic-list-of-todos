/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodoById } from './utils/getTodoById';
import { TodoCompletedCategory } from './types/todoCompletedCategory';
import { getTodos } from './api';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [todoCategory, setTodoCategory] = useState<TodoCompletedCategory>(
    TodoCompletedCategory.all,
  );

  function setTodosFromApi() {
    getTodos()
      .then(setTodos)
      .catch(() => alert('Todos api is wrong!'))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setTodosFromApi();
  }, []);

  useEffect(() => {
    setVisibleTodos(() => {
      return filterTodos(todos, todoCategory, query);
    });
  }, [todos, todoCategory, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQuery={setQuery}
                todoCategory={todoCategory}
                onTodoCategory={setTodoCategory}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  electTodoId={selectedTodoId}
                  onElectTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          todo={getTodoById(visibleTodos, selectedTodoId)}
          onSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
