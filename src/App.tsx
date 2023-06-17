/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<Todo | null>(null);
  const [selectedType, setSelectedType] = useState('All');
  const [modal, setModal] = useState(false);
  const [hasLoadingError, setHasIsLoadingError] = useState(false);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const visibleTitle = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (selectedType) {
        case 'active':
          return !todo.completed && visibleTitle;
        case 'completed':
          return todo.completed && visibleTitle;

        default:
          return visibleTitle;
      }
    });
  }, [todos, query, selectedType]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(false);
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (error) {
        setHasIsLoadingError(true);
      }
    };

    loadTodos();
  }, []);

  const showModal = (numberId: number) => {
    setModal(true);
    const searchedTodo = todos.find(todo => numberId === todo.id);

    if (searchedTodo) {
      setSelectedTodoId(searchedTodo);
    }
  };

  const closeModal = () => {
    setModal(false);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={query}
                onChangeInput={setQuery}
                selectValue={selectedType}
                onChangeSelect={setSelectedType}
              />
            </div>

            {(!isLoading && todos.length) ? (
              <div className="block">
                <TodoList
                  filteredTodos={visibleTodos}
                  selectTodo={selectedTodoId}
                  clickModal={showModal}
                />
              </div>
            ) : (
              <Loader />
            )}

            {(hasLoadingError && !todos.length)
              && <p>A server error occurred while uploading the data from server!</p>}
          </div>
        </div>
      </div>

      {modal && selectedTodoId
        && <TodoModal todo={selectedTodoId} clickModal={closeModal} />}
    </>
  );
};
