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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedType, setSelectedType] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const visibleTitle = todo.title.toLowerCase().includes(query.toLowerCase().trim());

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
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const showModal = (todoId: number) => {
    setModalIsOpen(true);
    const searchedTodo = todos.find(todo => todoId === todo.id);

    if (searchedTodo) {
      setSelectedTodo(searchedTodo);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTodo(null);
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
                  selectedTodo={selectedTodo}
                  clickModal={showModal}
                />
              </div>
            ) : (
              <Loader />
            )}

            {(isError && !todos.length)
              && <p>A server error occurred while uploading the data from server</p>}
          </div>
        </div>
      </div>

      {modalIsOpen && selectedTodo
        && <TodoModal todo={selectedTodo} clickModal={closeModal} />}
    </>
  );
};
