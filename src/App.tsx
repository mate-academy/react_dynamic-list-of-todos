/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [isLoader, setIsLoader] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectValue, setSelectValue] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const getTodosAsync = async () => {
      const receivedTodos = await getTodos();

      setTodos(receivedTodos);
      setIsLoader(false);
    };

    getTodosAsync();
  }, []);

  const todosForRender
    = todos
      .filter(({ title, completed }) => {
        switch (selectValue) {
          case 'active':
            return !completed && title.toLowerCase().includes(filterValue.toLowerCase());

          case 'completed':
            return completed && title.toLowerCase().includes(filterValue.toLowerCase());

          default:
            return true && title.toLowerCase().includes(filterValue.toLowerCase());
        }
      });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                filterValue={filterValue}
                handleSelect={setSelectValue}
                handleChange={setFilterValue}
              />
            </div>

            <div className="block">
              {isLoader
                ? <Loader />
                : (
                  <TodoList
                    todos={todosForRender}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
