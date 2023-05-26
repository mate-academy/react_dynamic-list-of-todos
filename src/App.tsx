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
  const [todosToRender, setTodosToRender] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(r => {
        setTodos(r);
        setTodosToRender(r);
      });
  }, []);

  useEffect(() => {
    setTodosToRender(todos.filter(todo => {
      const text = searchText.toLowerCase();

      switch (statusFilter) {
        case 'all':
          return todo.title.includes(text);
        case 'active':
          return todo.title.includes(text)
            && !todo.completed;
        case 'completed':
          return todo.title.includes(text)
            && todo.completed;

        default:
          return false;
      }
    }));
  }, [searchText, statusFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">
              Todos:
            </h1>

            <div className="block">
              <TodoFilter
                onStatusFilter={setStatusFilter}
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>

            <div className="block">
              {todosToRender.length
                ? (
                  <TodoList
                    todos={todosToRender}
                    selectedTodo={selectedTodo}
                    onInspectClick={setSelectedTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onModalShut={() => setSelectedTodo(null)}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
