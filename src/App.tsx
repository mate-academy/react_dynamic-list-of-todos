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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalOpen, setModelOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterSelected, setFilterSelected] = useState<string>('all');

  function applyFilters() {
    let updatedTodos = todos;

    if (filterSelected === 'active') {
      updatedTodos = updatedTodos.filter(todo => !todo.completed);
    } else if (filterSelected === 'completed') {
      updatedTodos = updatedTodos.filter(todo => todo.completed);
    }

    if (inputVal) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(inputVal.toLowerCase()),
      );
    }

    setFilteredTodos(updatedTodos);
  }

  function handleTextFilter(value: string) {
    setInputVal(value);
  }

  function handleStatusFilter(value: string) {
    setFilterSelected(value);
  }

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [inputVal, filterSelected, todos, applyFilters]);

  function openModal(todo: Todo) {
    setSelectedTodo(todo);
    setModelOpen(true);
  }

  function closeModal() {
    setSelectedTodo(null);
    setModelOpen(false);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todo={selectedTodo}
                toFilter={handleTextFilter}
                toFilterSelect={handleStatusFilter}
                inputVal={inputVal}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelectTodo={openModal}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && modalOpen && (
        <TodoModal todo={selectedTodo} onClose={closeModal} />
      )}
    </>
  );
};
