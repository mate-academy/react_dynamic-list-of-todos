/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
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
import { FilterOptions } from './types/FilterOptions';

const getAll = async (): Promise<Todo[]> => {
  return getTodos();
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectValue, setSelectValue] = useState(FilterOptions.All);
  const [inputValue, setInputValue] = useState('');

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (selectValue === FilterOptions.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (selectValue === FilterOptions.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (inputValue) {
      filteredTodos = filteredTodos
        .filter(todo => todo.title
          .toLowerCase()
          .includes(inputValue));
    }

    return filteredTodos;
  }, [todos, selectValue, inputValue]);

  const handleOpen = useCallback((userId: number, todo: Todo) => {
    setModalOpen(true);
    getUser(userId).then(user => setSelectedUser(user));
    setSelectedTodo(todo);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedUser(null);
    setSelectedTodo(null);
    setModalOpen(false);
  }, []);

  const handleSelectChange = useCallback((select: FilterOptions) => {
    setSelectValue(select);
  }, []);

  const handleInputChange = useCallback((input: string) => {
    setInputValue(input.toLowerCase());
  }, []);

  useEffect(() => {
    getAll().then((data) => {
      setIsLoading(false);
      setTodos(data);
    });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              handleSelectChange={handleSelectChange}
              handleInputChange={handleInputChange}
              selectInput={selectValue}
              inputValue={inputValue}
            />
          </div>

          <div className="block">
            {
              isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onOpen={handleOpen}
                    selectedTodo={selectedTodo}
                  />
                )
            }
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal
          handleClose={handleClose}
          user={selectedUser}
          todo={selectedTodo}
        />
      )}
    </div>
  );
};
