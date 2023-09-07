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

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(newTodos => {
      setTodos(newTodos);
      setVisibleTodos(newTodos);
    });
  }, []);

  const searchingTodos = todos.filter(actualTodo => actualTodo.title.includes(query));

  useEffect(() => {
    setVisibleTodos(searchingTodos);
  }, [query]);

  useEffect(() => {
    switch (status) {
      case 'all':
        setVisibleTodos(searchingTodos);
        break;

      case 'active':
        setVisibleTodos(searchingTodos.filter(visibleTodo => visibleTodo.completed === false));
        break;

      case 'completed':
        setVisibleTodos(searchingTodos.filter(visibleTodo => visibleTodo.completed === true));
        break;

      default:
        break;
    }
  }, [status]);

  const selectedTodo = (currentTodo: Todo | null) => {
    setTodo(currentTodo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onInput={setQuery}
                onChange={setStatus}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelect={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          todo={todo}
          onSelect={selectedTodo}
        />
      )}
    </>
  );
};
