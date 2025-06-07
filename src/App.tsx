import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTaskList } from './services/todos.service';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const clearSearch = () => setSearchInput('');

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getTaskList()
      .then(todoItems => {
        setAllTodos(todoItems);
        setTodos(todoItems);
      })
      .catch(() => setErrorMessage('Ooops, something went wrong!'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = allTodos;

    if (searchInput.trim() !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    setTodos(filtered);
  }, [searchInput, filter, allTodos]);

  const openModal = (id: number) => {
    setSelectedTodoId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                onInputChange={handleInput}
                onClear={clearSearch}
                filterSelected={filter}
                onFilter={handleFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={todos}
                  openModal={openModal}
                  selectedTodoId={selectedTodoId}
                />
              )}
              {!loading && errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodoId && (
        <TodoModal
          todo={todos.find(todo => todo.id === selectedTodoId)}
          onClose={closeModal}
        />
      )}
    </>
  );
};
