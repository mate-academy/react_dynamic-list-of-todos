/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectOption, setSelectOption] = useState('all');
  const [query, setQuery] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    let todosList = [...todos];

    if (selectOption === 'active') {
      todosList = todosList.filter(t => !t.completed);
    } else if (selectOption === 'completed') {
      todosList = todosList.filter(t => t.completed);
    }

    return todosList.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [todos, selectOption, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                select={selectOption}
                onStatusChange={setSelectOption}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectTodo}
                  selectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal
          selectTodo={selectTodo}
          onSelectTodo={() => setSelectTodo(null)}
        />
      )}
    </>
  );
};
