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
// import { User } from './types/User';

export const App: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedtodo, setselectedtodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedValue, setselectValue] = useState('All');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  const getFilteringTodos = filteredTodos.filter(todo => {
    switch (selectedValue) {
      case 'all':
        return true;
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return true;
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
                onSelect={setselectValue}
                onQuery={setQuery}
                query={query}
                selectValue={selectedValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  filteredTodos={getFilteringTodos}
                  setTodo={setselectedtodo}
                  selectedTodo={selectedtodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedtodo !== null && (
        <TodoModal setselectedtodo={setselectedtodo} todo={selectedtodo} />
      )}
    </>
  );
};
