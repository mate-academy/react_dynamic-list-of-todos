/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

enum Status {
  Active = 'active',
  Completed = 'completed',
}

function searchInTitle(title: string, search: string) {
  return title.toLowerCase().includes(search.trim().toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [filterByStatus, setFilterByStatus] = useState('all');
  const [query, setQuery] = useState('');

  const onTodo = (selectedTodo: Todo | null) => {
    setTodo(selectedTodo);
  };

  let selectedTodos;
  let visibleTodos;

  switch (filterByStatus) {
    case Status.Active:
      selectedTodos = todos.filter(currentTodo => !currentTodo.completed);
      break;

    case Status.Completed:
      selectedTodos = todos.filter(currentTodo => currentTodo.completed);
      break;

    default:
      selectedTodos = todos;
      break;
  }

  if (query) {
    visibleTodos = selectedTodos.filter(currentTodo => searchInTitle(currentTodo.title, query));
  } else {
    visibleTodos = selectedTodos;
  }

  useEffect(() => {
    getTodos()
      .then(loadedTodos => setTodos(loadedTodos));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByStatus={filterByStatus}
                setFilterByStatus={setFilterByStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? <TodoList todos={visibleTodos} todo={todo} onTodo={onTodo} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {todo && (<TodoModal todo={todo} onTodo={onTodo} />)}
    </>
  );
};
