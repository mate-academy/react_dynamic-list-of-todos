/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");


  useEffect(() => {
  setLoading(true);
  getTodos()
    .then(todosFromServer => {
      setTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
      setLoading(false);
    });
}, []);

  useEffect(() => {
    filterBySearch();
  }, [searchTerm, selectedStatus, todos]);

  const filterBySearch = () => {
    const newFilteredTodos = todos.filter(todo => {
      const matchesTitle = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' ||
                            (selectedStatus === 'active' && !todo.completed) ||
                            (selectedStatus === 'completed' && todo.completed);
      return matchesTitle && matchesStatus;
    });
    setFilteredTodos(newFilteredTodos);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };


  const openModal = (todoId: number) => {
    setSelectedTodoId(todoId);
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedTodoId(null);
    setShowModal(false)
  }


  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
            <TodoFilter onSearchChange={handleSearchChange} onStatusChange={handleStatusChange}/>
            </div>

            <div className="block">
            {loading ? <Loader /> : <TodoList todos={filteredTodos} openModal={openModal} selectedTodoId={selectedTodoId} />}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTodoId && (
        <TodoModal todoId={selectedTodoId} onClose={closeModal} />
      )}
    </>
  );
};
