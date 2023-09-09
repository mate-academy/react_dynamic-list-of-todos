/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterMode } from './types/FilterMode';
import { getTodos } from './api';

let fetchedTodos: Todo[] = [];

export const App: React.FC = () => {
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const displayTodos = (mode: FilterMode, query: string) => {
    let todos = fetchedTodos;

    switch (mode) {
      case FilterMode.active:
        todos = todos.filter(todo => !todo.completed);
        break;
      case FilterMode.completed:
        todos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query !== '') {
      todos = todos.filter(
        todo => todo.title.toLowerCase().includes(query.trim().toLocaleLowerCase()),
      );
    }

    setDisplayedTodos(todos);
  };

  const handleTodoListClick = (todoId: number) => {
    const clickedTodo = displayedTodos.find(todo => todo.id === todoId);

    if (clickedTodo) {
      setSelectedTodo(clickedTodo);
    }
  };

  const handleClickTodoModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then(extracted => {
        fetchedTodos = extracted;
        setDisplayedTodos(fetchedTodos);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter getTodos={displayTodos} />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : (
                <TodoList
                  todos={displayedTodos}
                  onClick={handleTodoListClick}
                  clickedTodoId={selectedTodo?.id || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClick={handleClickTodoModal}
        />
      )}
    </>
  );
};
