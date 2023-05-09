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
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');

  const loadTodos = async () => {
    const todos = await getTodos();

    setVisibleTodos(todos);
  };

  const changeInput = (string: string) => {
    setQuery(string);
  };

  const changeOption = (option: string) => {
    setSelectedOption(option);
  };

  const filterTodos = (string: string) => {
    let todos = visibleTodos;

    switch (selectedOption) {
      case 'active':
        todos = visibleTodos.filter(({ completed }) => !completed);
        break;
      case 'completed':
        todos = visibleTodos.filter(({ completed }) => completed);
        break;
      default:
        break;
    }

    return todos.filter(({ title }) => (
      title.toLowerCase().includes(string.toLowerCase())
    ));
  };

  const choosenTodo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const closeModal = () => {
    setCurrentTodo(null);
  };

  const filteredTodos = filterTodos(query);

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
                query={query}
                changeInput={changeInput}
                selectedOption={selectedOption}
                changeOption={changeOption}
              />
            </div>

            <div className="block">
              {filteredTodos.length === 0 && query === '' ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  currentTodo={currentTodo}
                  choosenTodo={choosenTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} closeModal={closeModal} />}
    </>
  );
};
