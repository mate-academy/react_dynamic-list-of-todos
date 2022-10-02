/* eslint-disable max-len */
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
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterTodoBy, setFilterTodoBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        setIsLoading(true);
      });
  }, []);

  const filterTodos = todos
    .filter((todoItem) => {
      switch (filterTodoBy) {
        case 'active':
          return !todoItem.completed;

        case 'completed':
          return todoItem.completed;

        default:
          return true;
      }
    });

  const visibleTodos = filterTodos
    .filter((todoItem) => (
      todoItem.title.toLowerCase().includes(query.toLowerCase())
    ));

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
                filterTodoBy={filterTodoBy}
                setFilterTodoBy={setFilterTodoBy}
              />
            </div>

            <div className="block">
              {
                !isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodos}
                      selectTodo={todo}
                      setSelectedTodo={setTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {todo?.userId && (
        <TodoModal
          todo={todo}
          selectedTodo={setTodo}
        />
      )}

    </>
  );
};
