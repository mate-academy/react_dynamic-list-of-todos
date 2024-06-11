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

export type Select = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState<Select>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visiableTodos = () => {
    const filteredTodos = todos;

    if (selectValue !== 'all') {
      return filteredTodos
        .filter(todo => {
          switch (selectValue) {
            case 'active':
              return todo.completed !== true;

            case 'completed':
              return todo.completed === true;
          }
        })
        .filter(todo => {
          return todo.title.toLowerCase().includes(query.toLowerCase().trim());
        });
    }

    return filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase().trim());
    });
  };

  const handleInput = (value: string) => {
    setQuery(value);
  };

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setLoading(true);

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
                query={query}
                onChange={handleInput}
                select={selectValue}
                onSelect={value => setSelectValue(value)}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visiableTodos()}
                onClick={selectTodo}
                selected={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={selectTodo} />}
    </>
  );
};
