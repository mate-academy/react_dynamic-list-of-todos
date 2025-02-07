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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [done, setDone] = useState<Todo[]>([]);
  const [undone, setUndone] = useState<Todo[]>([]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === 'active') {
      setUndone(todos.filter(todo => !todo.completed));
      setDone([]);
    } else if (value === 'completed') {
      setDone(todos.filter(todo => todo.completed));
      setUndone([]);
    } else {
      setDone(todos);
      setUndone(todos);
    }
  };

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (done.length > 0 && undone.length === 0) {
        return todo.completed;
      }

      if (undone.length > 0 && done.length === 0) {
        return !todo.completed;
      }

      return true;
    });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getTodos()
        .then(data => setTodos(data))
        .finally(() => setLoading(false));
    }, 2000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                setQuery={setQuery}
                handleStatusChange={handleStatusChange}
                setSelectedTodo={setSelectedTodo}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  setShown={setShown}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {shown && (
        <TodoModal
          todo={selectedTodo}
          setShown={setShown}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
