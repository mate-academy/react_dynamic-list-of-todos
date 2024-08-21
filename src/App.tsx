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
  const [isLoader, setIsLoader] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [methodFilter, setMethodFilter] = useState('all');
  const [value, setValue] = useState('');

  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoader(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      })
      .finally(() => setIsLoader(false));
  }, []);

  useEffect(() => {
    let filtered = todos;

    if (methodFilter === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    }

    if (methodFilter === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    if (value) {
      filtered = filtered.filter(todo =>
        todo.title.toLocaleLowerCase().includes(value.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [methodFilter, todos, value]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                method={methodFilter}
                setMethod={setMethodFilter}
                value={value}
                setValue={setValue}
              />
            </div>

            <div className="block">
              {isLoader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={activeTodo}
                  onSelectedTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
      {activeTodo && (
        <TodoModal
          selectedTodo={activeTodo}
          onCloseSelectedTodo={() => setActiveTodo(null)}
        />
      )}
    </>
  );
};
