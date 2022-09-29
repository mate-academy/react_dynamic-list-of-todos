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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(todos[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [inputValue, setInputvalue] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setIsLoading(true);
      })
      .finally(() => setIsLoading(true));
  }, []);

  const setTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const todosFilter = todos
    .filter(todo => {
      if (filterBy === 'active') {
        return !todo.completed;
      }

      if (filterBy === 'completed') {
        return todo.completed;
      }

      return todo;
    })
    .filter(({ title }) => (
      title.toLowerCase().includes(inputValue.toLowerCase())
    ));

  const handleSelect = (value: string) => {
    setFilterBy(value);
  };

  const handleInput = (value: string) => {
    setInputvalue(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                inputValue={inputValue}
                handleInput={handleInput}
                handleSelect={handleSelect}
              />
            </div>

            <div className="block">
              {!isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={todosFilter}
                    selectedTodo={selectedTodo}
                    setTodo={setTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
