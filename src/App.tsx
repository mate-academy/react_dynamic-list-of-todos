/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getAll = async (): Promise<Todo[]> => {
  return getTodos();
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectValue, setSelectValue] = useState<string>('all');
  const [inputValue, setInputValue] = useState<string>('');
  let visibleTodos = todos;

  if (selectValue === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (selectValue === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (inputValue) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(inputValue));
  }

  useEffect(() => {
    getAll().then((data) => {
      setIsLoad(false);
      setTodos(data);
    });
  }, []);

  const openModal = useCallback((userId: number, todo: Todo) => {
    setModalOpen(true);
    getUser(userId).then(user => setSelectedUser(user));
    setSelectedTodo(todo);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedUser(null);
    setSelectedTodo(null);
    setModalOpen(false);
  }, []);

  const handleSelectChange = useCallback((select: string) => {
    setSelectValue(select);
  }, []);

  const handleInputChange = useCallback((input: string) => {
    setInputValue(input.toLowerCase());
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelectChange={handleSelectChange}
                handleInputChange={handleInputChange}
              />
            </div>

            <div className="block">
              {
                isLoad
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodos}
                      openModal={openModal}
                      selectedTodo={selectedTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {isModalOpen
      && (
        <TodoModal
          closeModal={closeModal}
          user={selectedUser}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
