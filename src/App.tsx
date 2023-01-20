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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [personalTodo, setPersonalTodo] = useState<Todo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectedTodos = (value: string) => {
    setSelectedTodos(value);
  };

  const handleSearchQuery = (event: React.SetStateAction<string>) => {
    setSearchQuery(event);
  };

  const visibleTodos = todos.filter(todo => {
    const filteredTodo = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    switch (selectedTodos) {
      case 'active':
        return todo.completed === false && filteredTodo;
        break;

      case 'completed':
        return todo.completed === true && filteredTodo;
        break;

      default:
        break;
    }

    return filteredTodo;
  });

  const handleClickModalButton = (todo: Todo) => {
    setPersonalTodo(todo);

    setIsModalOpen(true);
  };

  const loadTodos = async () => {
    setIsFetching(true);
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);

    setIsFetching(false);
  };

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
                selectedTodos={selectedTodos}
                handleSelectedTodos={handleSelectedTodos}
                searchQuery={searchQuery}
                handleSearchQuery={handleSearchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {isFetching
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    visibleTodos={visibleTodos}
                    handleClickModalButton={handleClickModalButton}
                    isModalOpen={isModalOpen}
                    personalTodo={personalTodo}
                  />
                </div>
              )}

          </div>
        </div>
      </div>

      {personalTodo
        && isModalOpen
        && (
          <TodoModal
            personalTodo={personalTodo}
            setIsModalOpen={setIsModalOpen}
          />
        )}
    </>
  );
};
