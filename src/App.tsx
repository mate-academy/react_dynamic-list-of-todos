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
  const [loading, setLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const selectedTodo = (todos.find(todo => todo.id === todoId));
  const filteredList = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase())).filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  useEffect(() => {
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
                setQuery={setQuery}
                query={query}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList selectedTodoId={setTodoId} selectedTodo={selectedTodo} filteredList={filteredList} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setTodoId={setTodoId} />}
    </>
  );
};
