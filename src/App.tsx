import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => (error));

    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => (error));
  }, []);

  const handleShowTodoModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseTodoModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const filteredTodos = todos.filter((todo) => {
    const titleMatch = todo.title.toLowerCase()
      .includes(searchValue.toLowerCase());

    if (filterValue === 'all') {
      return titleMatch;
    }

    if (filterValue === 'active') {
      return !todo.completed && titleMatch;
    }

    if (filterValue === 'completed') {
      return todo.completed && titleMatch;
    }

    return false;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  users={users}
                  onShowTodoModal={handleShowTodoModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          users={users}
          onCloseTodoModal={handleCloseTodoModal}
        />
      )}
    </>
  );
};

export default App;
