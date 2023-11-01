/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Option } from './types/Option';
import { Todo } from './types/Todo';

const filteredTodos = (
  todos: Todo[],
  query: string,
  option: string,
) => {
  let filteredByOption: Todo[] = [];

  if (option) {
    filteredByOption = todos.filter((todo) => {
      switch (option) {
        case Option.ACTIVE:
          return !todo.completed;

        case Option.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  if (query) {
    filteredByOption = filteredByOption.filter(todo => (
      todo.title.toLowerCase().includes(query.trim().toLowerCase())
    ));
  }

  return filteredByOption;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(Option.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = filteredTodos(todos, query, option);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setOption={setOption}
                option={option}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
