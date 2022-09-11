import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res);
      });
  }, []);

  const result = todos.filter(todo => {
    switch (statusFilter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const visibleTodo = result.filter(todo => {
    return todo.title.toLowerCase().includes(textFilter.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={statusFilter}
                setValue={setStatusFilter}
                text={textFilter}
                setText={setTextFilter}
              />
            </div>

            <div className="block">
              {!todos.length ? <Loader /> : (
                <TodoList
                  activeTodo={activeTodo}
                  todos={visibleTodo}
                  setActiveTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo !== null && (
        <TodoModal
          todo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};
