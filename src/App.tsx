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
  const [isSelected, setIsSelected] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectStatus, setSelectStatus] = useState('all');

  const getTodosFromApi = async (callback: () => Promise<Todo[]>) => {
    try {
      const todosFromApi = await callback();

      setTodos(todosFromApi);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    getTodosFromApi(getTodos);
  }, []);

  const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0]);

  let visibleTodos = todos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase().trim())));

  switch (selectStatus) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => (
        todo.completed === false));
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => (
        todo.completed === true));
      break;

    default:
      break;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setSelectStatus={setSelectStatus}
              />
            </div>

            {todos.length === 0
              ? (
                <Loader />
              ) : (
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    setIsSelected={setIsSelected}
                    isSelected={isSelected}
                    setSelectedTodo={setSelectedTodo}
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      {isSelected && (
        <TodoModal
          selectedTodo={selectedTodo}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      )}
    </>
  );
};
