/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const selectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const onCloseModal = () => {
    setSelectedTodoId(0);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) as Todo;

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
                    selectTodo={selectTodo}
                    selectedTodoId={selectedTodoId}
                    todos={visibleTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          onCloseModal={onCloseModal}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
