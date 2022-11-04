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
import { TodoStatus } from './types/TodoStatus';

type TodoSelectHandler = (todoId: number) => void;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.All);
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setDataIsLoaded(true);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoSelect: TodoSelectHandler = (todoId) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const filterTodos = () => {
    const loweredQuery = query.toLowerCase();
    const filteredTodos = todos.filter(({ title }) => {
      const loweredTitle = title.toLowerCase();

      return loweredTitle.includes(loweredQuery);
    });

    return filteredTodos.filter(todo => {
      switch (todoStatus) {
        case TodoStatus.Completed:
          return todo.completed;

        case TodoStatus.Active:
          return !todo.completed;

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoStatus={todoStatus}
                selectStatus={setTodoStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            {!dataIsLoaded
              ? (
                <div className="block">
                  <Loader />
                </div>
              ) : (
                <div className="block">
                  <TodoList
                    todos={filterTodos()}
                    selectedTodoId={selectedTodoId}
                    selectTodo={handleTodoSelect}
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal todo={selectedTodo} selectTodo={handleTodoSelect} />
      )}
    </>
  );
};
