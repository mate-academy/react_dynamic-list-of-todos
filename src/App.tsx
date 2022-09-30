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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setLoader(true);
      });
  }, []);

  const selectedTodos = todos.filter(todo => {
    switch (selectedOption) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const filteredTodos = selectedTodos.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                query={query}
                setSelectedOption={setSelectedOption}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                !loader
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filteredTodos}
                      todoId={todoId}
                      setTodoId={setTodoId}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todos={filteredTodos}
          todoId={todoId}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
