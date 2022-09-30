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

const defaultTodo = {
  id: 0,
  title: 'no title',
  completed: false,
  userId: 0,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoader, setIsLoader] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(defaultTodo);
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

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleSelect = (value: string) => {
    setSelectValue(value);
  };

  const handleChange = (value: string) => {
    setFilterValue(value);
  };

  const todosForRender
    = todos
      .filter(({ completed }) => {
        switch (selectValue) {
          case 'active':
            return !completed;

          case 'completed':
            return completed;

          default:
            return true;
        }
      })
      .filter(({ title }) => (
        title.toLowerCase().includes(filterValue.toLowerCase())
      ));

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
                handleSelect={handleSelect}
                handleChange={handleChange}
              />
            </div>

            <div className="block">
              {isLoader
                ? <Loader />
                : (
                  <TodoList
                    todos={todosForRender}
                    selectedTodoId={selectedTodo.id}
                    onSelect={handleTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.id
      && (
        <TodoModal
          todo={selectedTodo}
          onSelect={handleTodo}
        />
      )}
    </>
  );
};
