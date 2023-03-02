import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { ErrorApp } from './types/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [todoByStatus, setTodoByStatus] = useState<string>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const correctSearch = searchInput.toLowerCase().trim();
  let filteredTodos = [...todos];

  if (correctSearch) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.includes(correctSearch));
  }

  if (todoByStatus === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (todoByStatus === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed === true);
  }

  const resetInput = () => {
    setSearchInput('');
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoFromServer = await getTodos();

        setTodos(todoFromServer);
      } catch (error) {
        setErrorMessage(true);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                todoByStatus={todoByStatus}
                setTodoByStatus={setTodoByStatus}
                reset={resetInput}
              />
            </div>

            <div className="block">
              {todos.length === 0 && !errorMessage
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
              <ErrorApp
                todos={todos}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
