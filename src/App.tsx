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
  const FILTER = {
    FILTER_ALL: 'all',
    FILTER_ACTIVE: 'active',
    FILTER_COMPLETED: 'completed',
  };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(FILTER.FILTER_ALL);
  const [inputFilter, setInputFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [, setModalOpened] = useState(true);

  useEffect(() => {
    let filteredTodos: Todo[];

    getTodos().then(todosFromServer => {
      switch (selectedFilter) {
        case FILTER.FILTER_ACTIVE:
          filteredTodos = todosFromServer.filter(
            todo => todo.completed === false,
          );
          break;
        case FILTER.FILTER_COMPLETED:
          filteredTodos = todosFromServer.filter(
            todo => todo.completed === true,
          );
          break;
        default:
          filteredTodos = todosFromServer;
          break;
      }

      if (inputFilter.length !== 0) {
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(inputFilter.toLowerCase()),
        );
      }

      setTodos(filteredTodos);
    });
  }, [selectedFilter, inputFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={setSelectedFilter}
                onInputChange={setInputFilter}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onSelectedTodo={setSelectedTodo}
                  onModalOpened={setModalOpened}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
          onModalOpened={setModalOpened}
        />
      )}
    </>
  );
};
