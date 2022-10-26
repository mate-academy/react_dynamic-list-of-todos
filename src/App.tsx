/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(todos[0]);

  const openModal = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadTodos = async () => {
    setIsLoading(true);
    const todosFromServer = await getTodos();

    setIsLoading(false);
    setTodos(todosFromServer);
  };

  const onCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filterTodos = (allTodos: Todo[]) => {
    let filteredTodos = allTodos;

    switch (category) {
      case 'completed':
        filteredTodos = allTodos.filter((todo) => todo.completed);
        break;
      case 'active':
        filteredTodos = allTodos.filter((todo) => !todo.completed);
        break;
      case 'all':
      default:
        filteredTodos = allTodos;
    }

    if (query !== '') {
      filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return filteredTodos;
  };

  const visibleTodos = filterTodos(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onCategoryChange={onCategoryChange}
                onQueryChange={onQueryChange}
                category={category}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    openModal={openModal}
                    isModalOpen={isModalOpen}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen
      && (
        <TodoModal
          closeModal={closeModal}
          currentTodo={currentTodo}
        />
      )}
    </>
  );
};
