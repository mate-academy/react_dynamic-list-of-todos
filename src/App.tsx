/* eslint-disable max-len */
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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [sortType, setSortType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const getTodo = (): Todo => {
    return todos.find(todo => todo.id === selectedTodoId) || todos[0];
  };

  const filteredTodos: Todo[] = todos.filter(todo => {
    if (sortType === 'active') {
      return !todo.completed;
    }

    if (sortType === 'completed') {
      return todo.completed;
    }

    return true;
  }).filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setSortType={setSortType} sortType={sortType} query={query} setQuery={setQuery} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList todos={filteredTodos} setSelectedTodoId={setSelectedTodoId} selectedTodoId={selectedTodoId} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && <TodoModal selectedTodo={getTodo()} setSelectedTodoId={setSelectedTodoId} />}
    </>
  );
};
