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

const initialTodo: Todo = {
  userId: 0,
  id: 0,
  title: '0',
  completed: false,
};

const filteredTodos = (todos: Todo[], filter: string, query: string) => {
  let filtered = todos;

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseQuery),
    );
  }

  switch (filter) {
    case 'all':
      return filtered;
    case 'active':
      return filtered.filter(todo => !todo.completed);
    case 'completed':
      return filtered.filter(todo => todo.completed);
    default:
      return filtered;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>(initialTodo);
  const [loading, setLoading] = useState(true);
  const [iconEyeId, setIconEyeId] = useState(0);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visibleTodos = filteredTodos(todos, filter, query);

  function getAllTodos() {
    getTodos()
      .then(resultTodos => {
        setTodos(resultTodos);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    getAllTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  setShowModal={setShowModal}
                  setTodo={setTodo}
                  iconEyeId={iconEyeId}
                  setIconEyeId={setIconEyeId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          showModal={showModal}
          setShowModal={setShowModal}
          todo={todo}
          setIconEyeId={setIconEyeId}
        />
      )}
    </>
  );
};
