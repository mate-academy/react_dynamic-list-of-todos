/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilteringType } from './types/FilteringType';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [filter, setFilter] = useState<FilteringType>(FilteringType.all);
  const [title, setTitle] = useState('');
  const [todoCard, setTodoCard] = useState<Todo | undefined>();

  useEffect(() => {
    setTodosLoading(true);
    getTodos().then((todo) => {
      setTodos(todo);
    })
      .finally(() => setTodosLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                input={title}
                setInput={setTitle}
                selectedButton={filter}
                setSelectedButton={setFilter}
              />
            </div>

            <div className="block">
              {todosLoading && (
                <Loader />
              )}
              {!todosLoading && todos.length > 0 && (
                <TodoList
                  title={title}
                  todos={todos}
                  filter={filter}
                  todoCard={todoCard}
                  setTodoCard={setTodoCard}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoCard && (
        <TodoModal
          todoCard={todoCard}
          setTodoCard={setTodoCard}
        />
      )}

    </>
  );
};
