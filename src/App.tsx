/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [statusSelect, setStatusSelect] = useState<Status>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // carregar todos
  useEffect(() => {
    setTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setTodosLoading(false));
  }, []);

  // aplicar filtros de status e busca
  useEffect(() => {
    let result = [...todos];

    if (statusSelect === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (statusSelect === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(todo => todo.title.toLowerCase().includes(q));
    }

    // ⬇️ linha em branco acima é obrigatória pela regra padding-line-between-statements
    setFilteredTodos(result);
  }, [statusSelect, todos, query]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setUserLoading(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setUserLoading(false));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
    setUserLoading(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusValue={statusSelect}
                onStatusChange={setStatusSelect}
                onQueryChange={setQuery}
                searchValue={query}
              />
            </div>

            <div className="block">
              {todosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          loading={userLoading}
          onClose={closeModal}
        />
      )}
    </>
  );
};
