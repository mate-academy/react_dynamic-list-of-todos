/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

enum StatusesSelect {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function getFilteredTodos(initialTodos: Todo[], statusSelect: string): Todo[] {
  if (statusSelect === StatusesSelect.Active) {
    return initialTodos.filter(item => !item.completed);
  } else if (statusSelect === StatusesSelect.Completed) {
    return initialTodos.filter(item => item.completed);
  } else {
    return initialTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState<string>(StatusesSelect.All);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const filteredTodos = getFilteredTodos(todos, statusSelect);
  const normalizeTodos = filteredTodos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setLoadingTodos(false);
      });
  }, []);

  const handlerSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handlerGetStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusSelect(e.target.value);
  };

  const handlerCloseModal = () => {
    setSelectedTodo(null);
  };

  const handlerChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlerReset = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onReset={handlerReset}
                onChangeQuery={handlerChangeQuery}
                onGetStatusSelect={handlerGetStatusSelect}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  data={normalizeTodos}
                  onSelectedTodo={handlerSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseModal={handlerCloseModal}
        />
      )}
    </>
  );
};
