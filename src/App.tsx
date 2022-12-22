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

const defaultUser: User = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

const defaultTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(defaultTodo);
  const [currentFilter, setCurrentFilter] = useState<Filter | string>(Filter.ALL);
  const [inputValue, setInputValue] = useState('');

  const loadingData = async () => {
    setIsLoading(true);

    try {
      const todosList = await getTodos();

      setIsLoading(false);
      setTodos(todosList);
    } catch (error) {
      setIsLoading(false);
      setTodos([]);
    }
  };

  const onShowModal = async (userId: number, todo: Todo) => {
    setIsModalShown(true);
    setIsModalLoading(true);
    setSelectedTodo(todo);

    try {
      const userDetails = await getUser(userId);

      setIsModalLoading(false);
      setCurrentUser(userDetails);
    } catch (error) {
      setIsModalLoading(false);
      setCurrentUser(defaultUser);
    }
  };

  const onModalClose = () => {
    setIsModalShown(false);
    setSelectedTodo(defaultTodo);
  };

  const onFilterSelect = (value: Filter | string) => {
    setCurrentFilter(value);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const onFilter = () => {
    return todos.filter(todo => {
      const matchedInputTodo = todo.title.toLowerCase().includes(inputValue.toLowerCase());

      if (currentFilter === Filter.COMPLETED) {
        return todo.completed && matchedInputTodo;
      }

      if (currentFilter === Filter.ACTIVE) {
        return !todo.completed && matchedInputTodo;
      }

      return todo && matchedInputTodo;
    });
  };

  useEffect(() => {
    loadingData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onInputChange={onInputChange}
                onFilterSelect={onFilterSelect}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={onFilter()}
                  isShown={onShowModal}
                  currentTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && (
        <TodoModal
          loading={isModalLoading}
          user={currentUser}
          todo={selectedTodo}
          close={onModalClose}
        />
      )}
    </>
  );
};
