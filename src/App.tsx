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
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then(todos => {
      setSelectedTodos(todos);
      setLoadingTodos(false);
    });
  }, []);

  const filtredTodos = () => {
    const todosWithQuery = () => {
      if (query === '') {
        return selectedTodos;
      }

      return selectedTodos.filter(todo => (
        todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())));
    };

    switch (status) {
      case 'active':
        return todosWithQuery().filter(todo => !todo.completed);

      case 'completed':
        return todosWithQuery().filter(todo => todo.completed);

      case 'all':
      default:
        return todosWithQuery();
    }
  };

  const visibleTodos = filtredTodos();

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
                onChangeQuery={setQuery}
                onChangeFilter={setStatus}
              />
            </div>

            <div className="block">
              {(!loadingTodos)
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}

    </>
  );
};
