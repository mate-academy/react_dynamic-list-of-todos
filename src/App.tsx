/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/Filter';

export const checkTitle = (title: string, filterByText: string) => {
  return title.toLowerCase().includes(filterByText.toLowerCase());
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [loader, setLoader] = useState(true);
  const [filterByValue, setFilterByValue] = useState(FilterType.All);
  const [filterByText, setFilterByText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();

      setLoader(false);
      setTodos(response);
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(({ title, completed }) => {
    switch (filterByValue) {
      case FilterType.Active:
        return !completed && checkTitle(title, filterByText);

      case FilterType.Completed:
        return completed && checkTitle(title, filterByText);

      default:
        return checkTitle(title, filterByText);
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
                value={filterByValue}
                text={filterByText}
                setValue={setFilterByValue}
                setText={setFilterByText}
              />
            </div>

            <div className="block">
              { loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={todoId}
                  selectedTodo={(todo) => setTodoId(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={todos}
          selectedTodo={(todo) => setTodoId(todo)}
        />
      )}
    </>
  );
};
