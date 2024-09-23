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
import { TodoStatus } from './constants';


export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [searchTerm, setSearchTerm] = useState<string>("");


  useEffect(() => {
  setLoading(true);
  getTodos()
  .then(setTodos)
  .catch(error => console.error('Error fetching todos:', error))
  .finally(() => setLoading(false));
}, []);

const visibleTodos = todos.filter(todo => {
  const matchesTitle = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus = selectedStatus === TodoStatus.ALL ||
    (selectedStatus === TodoStatus.ACTIVE && !todo.completed) ||
    (selectedStatus === TodoStatus.COMPLETED && todo.completed);
  return matchesTitle && matchesStatus;
});


  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (status: TodoStatus) => {
    setSelectedStatus(status);
  };


  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
  }

  const closeModal = () => {
    setSelectedTodo(null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchTerm={searchTerm}
                selectedStatus={selectedStatus}
                onSearchChange={handleSearchChange}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  openModal={openModal}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
}
