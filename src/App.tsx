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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todosData = await getTodos();

        setTodos(todosData);
        setFilteredTodos(todosData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    let updatedTodos = todos;

    if (status !== 'all') {
      updatedTodos = updatedTodos.filter(todo =>
        status === 'active' ? !todo.completed : todo.completed,
      );
    }

    if (searchText) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFilteredTodos(updatedTodos);
  }, [todos, status, searchText]);

  const handleFilter = (newSearchText: string, newStatus: string) => {
    setSearchText(newSearchText);
    setStatus(newStatus);
  };

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={handleFilter} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  openModal={openModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          modal={!!selectedTodo}
          todo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
