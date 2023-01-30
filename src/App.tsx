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
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  const getTodoById = (id: number) => {
    return todos.find(todo => todo.id === id) as Todo;
  };

  const selectTodoId = (id: number) => {
    setTodoId(id);
  };

  const selectUserId = (id: number) => {
    setUserId(id);
  };

  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  let visibleTodos = [...todos];

  if (selectedOption === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (selectedOption === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerQuery)));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                onSelectOption={selectOption}
                onHandleQuery={handleQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    todoId={todoId}
                    onSelectTodo={selectTodoId}
                    onSelectUser={selectUserId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          userId={userId}
          todo={getTodoById(todoId)}
          onClose={selectTodoId}
        />
      )}
    </>
  );
};
