/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './services/todo';

type Params = {
  query: string;
  filter: string;
};

function getPreparedTodos(allTodos: Todo[], { query, filter }: Params) {
  let filteredTodos = [...allTodos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (filter) {
    switch (filter) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
    }
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos().then(todosFromServer => {
      setTimeout(() => {
        setTodos(todosFromServer);
        setLoading(false);
      }, 400);
    });
  }, []);

  const preparedTodos = getPreparedTodos(todos, { query, filter });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputQuery={query}
                showFilter={filter}
                setInputQuery={newQuery => setQuery(newQuery)}
                setShowFilter={newFilter => setFilter(newFilter)}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={preparedTodos}
                selected={selectedTodo}
                handleShowCliCk={todo => {
                  setSelectedTodo(todo);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          handleClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
