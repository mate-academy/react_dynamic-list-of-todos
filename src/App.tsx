import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [statusTodo, setStatusTodo] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);

        const userPromises = todosFromServer.map(todo => getUser(todo.userId));

        return Promise.all(userPromises);
      })
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .finally(() => setLoader(false));
  }, []);

  const filterTodos = (status: string, searchTermTodo: string) => {
    let updatedTodos = todos;

    if (status === 'active') {
      updatedTodos = updatedTodos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      updatedTodos = updatedTodos.filter(todo => todo.completed);
    }

    if (searchTermTodo) {
      const lowerCaseSearchTerm = searchTermTodo.toLowerCase();

      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(lowerCaseSearchTerm),
      );
    }

    setFilteredTodos(updatedTodos);
  };

  const handleFilterChange = (selectedStatus: string) => {
    setStatusTodo(selectedStatus);
    filterTodos(selectedStatus, searchTerm);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    filterTodos(statusTodo, term);
  };

  const handleSelectTodo = (todo: Todo) => {
    setIsLoadingModal(true);
    setSelectedTodo(todo);
    setIsModalOpen(true);

    setTimeout(() => {
      setIsLoadingModal(false);
    }, 1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId) || null;
  };

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
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {!loader && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedTodo && (
        <TodoModal
          isLoading={isLoadingModal}
          todo={selectedTodo}
          onClose={closeModal}
          user={getUserById(selectedTodo.userId)}
        />
      )}
    </>
  );
};
