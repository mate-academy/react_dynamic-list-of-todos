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
import { GroupBy } from './types/GroupBy';

function checkQuery(query:string, content:string) {
  return content.toLowerCase()
    .includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todoId, setTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState<GroupBy | string>(GroupBy.ALL);
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    const data = await getTodos();

    setIsLoaded(true);
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos
    .filter(({ completed, title }) => {
      switch (filterBy) {
        case GroupBy.ACTIVE:
          return !completed && checkQuery(query, title);

        case GroupBy.COMPLETED:
          return completed && checkQuery(query, title);

        default:
          return checkQuery(query, title);
      }
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={todoId}
                    selectTodo={setTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={filteredTodos}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
