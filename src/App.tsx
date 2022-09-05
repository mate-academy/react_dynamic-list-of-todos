import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoFilterBy } from './types/TodoFilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(TodoFilterBy.NONE);

  const selectedTodo = (todos.find(todo => todo.id === todoId));
  const filteredList = todos.filter(todo => todo.title.toLowerCase()
    .includes(query.toLowerCase())).filter(todo => {
    switch (filter) {
      case TodoFilterBy.ACTIVE:
        return !todo.completed;
      case TodoFilterBy.COMPLETED:
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
                setFilter={setFilter}
                filter={filter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                selectedTodoId={setTodoId}
                selectedTodo={selectedTodo}
                filteredList={filteredList}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && <TodoModal selectedTodo={selectedTodo} setTodoId={setTodoId} />}
    </>
  );
};
