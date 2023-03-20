/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchBarValue, setSearchBarValue] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, []);

  const showTodo = (todoId: number, userId: number) => {
    setSelectedTodoId(todoId);
    setModalOpen(true);
    getUser(userId).then(user => setCurrentUser(user));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodoId(null);
    setCurrentUser(null);
  };

  const getFilter = (filter: string) => setSelectedFilter(filter);

  const filterTodos = (option: string, searchValue?: string) => {
    let filteredTodos = [...todos];

    if (searchValue) {
      filteredTodos = filteredTodos.filter(todo => todo.title.includes(searchValue));
    }

    switch (option) {
      case 'completed':
        return filteredTodos.filter(todo => todo.completed);

      case 'active':
        return filteredTodos.filter(todo => !todo.completed);

      default:
        return filteredTodos;
    }
  };

  const getSearchBarValue = (value: string) => setSearchBarValue(value);

  const getCurrentTodo = () => {
    if (!selectedTodoId) {
      return todos[0];
    }

    return todos.filter(todo => todo.id === selectedTodoId)[0];
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getFilter={getFilter}
                selectedFilter={selectedFilter}
                searchBarValue={searchBarValue}
                getSearchBarValue={getSearchBarValue}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={filterTodos(selectedFilter, searchBarValue)}
                selectedTodoId={selectedTodoId}
                showTodo={showTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal
          closeModal={closeModal}
          currentUser={currentUser}
          currentTodo={getCurrentTodo()}
        />
      )}
    </>
  );
};
