/* eslint-disable max-len */
import React, { memo, useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = memo(() => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');

  const selectTodo = useCallback((todoId: number) => {
    setSelectedTodo(
      todos.find(todo => todo.id === todoId) || null,
    );
  }, [todos]);

  const preaperedSearchQuery = query.toLowerCase();

  const visibleTodo = todos.filter(todo => {
    const serchingQuery = todo.title.toLowerCase().includes(preaperedSearchQuery);

    const selectedOption = (value: string) => {
      switch (value) {
        case 'all':
          return todo;

        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        default:
          break;
      }

      return value;
    };

    const filteredTodo = selectedOption(selectFilter);

    return serchingQuery && filteredTodo;
  });

  useEffect(() => {
    getTodos()
      .then(todo => setTodo(todo));
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
                onSearch={setQuery}
                value={selectFilter}
                setValue={setSelectFilter}
              />
            </div>

            <div className="block">
              {visibleTodo.length === 0

                ? <Loader />

                : (
                  <TodoList
                    todos={visibleTodo}
                    selectedIdTodo={selectedTodo?.id}
                    selectedTodo={(idTodo) => {
                      selectTodo(idTodo);
                    }}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todoUserId={selectedTodo}
          onClose={(todId: number) => selectTodo(todId)}
        />
      )}
    </>
  );
});
