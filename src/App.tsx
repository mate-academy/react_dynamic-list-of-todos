/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Completion } from './types/Completion';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosLoaded, setTodosLoaded] = useState(false);

  const [valueSelection, setValueSelection] = useState('All');
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setTodosLoaded(true);
    };

    loadTodosFromServer();
  }, []);

  const chooseTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const lowercaseSearchReasult = searchResult.toLowerCase();

  const searchedTodos = todos.filter(({ title }) => title.toLowerCase().includes(lowercaseSearchReasult));

  const filteredSearchedTodos = () => {
    const result = searchedTodos.filter(({ completed }) => {
      switch (valueSelection) {
        case Completion.Active:
          return !completed;

        case Completion.Completed:
          return completed;

        default:
          return searchedTodos;
      }
    });

    return result;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                valueSelection={valueSelection}
                setValueSelection={setValueSelection}
                searchResult={searchResult}
                setSearchResult={setSearchResult}
              />
            </div>

            <div className="block">
              {!todosLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredSearchedTodos()}
                    chooseTodoHandler={chooseTodo}
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
          closeModalHandler={closeModal}
        />
      )}
    </>
  );
};
