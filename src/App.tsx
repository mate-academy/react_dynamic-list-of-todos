/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { FilterType, filterTodos } from './utils/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [todoType, setTodoType] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    const filteredTodos = await filterTodos(todoType, query);

    setTodos(filteredTodos);
  };

  useEffect(() => {
    fetchData();
  }, [query, todoType]);

  const handleSetActiveTodo = (activeId: number) => {
    if (todos !== null) {
      const todoTemp = todos.find((todo) => todo.id === activeId) || null;

      setActiveTodo(todoTemp);
    }
  };

  const handleClose = () => {
    setActiveTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={setQuery}
                onChangeType={setTodoType}
                query={query}
              />
            </div>

            <div className="block">
              {!todos
                ? <Loader />
                : <TodoList todos={todos} activeTodoId={activeTodo?.id} onActiveTodo={handleSetActiveTodo} />}

            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal todo={activeTodo} onClose={handleClose} />
      )}

    </>
  );
};
