import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(loadedTodos => {
        setLoadingTodos(false);
        setTodos(loadedTodos);
      });
  }, []);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filteredTodos = useMemo(() => {
    if (query === '') {
      return todos;
    }

    return todos.filter(todo => (
      todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())));
  }, [query, todos]);

  const showedTodos = useMemo(() => {
    if (status === 'all') {
      return filteredTodos;
    }

    return filteredTodos.filter(todo => (
      status === 'active'
        ? !todo.completed
        : todo.completed
    ));
  }, [status, filteredTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onChangeStatus={setStatus}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadingTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={showedTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
