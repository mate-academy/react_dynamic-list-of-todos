/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(visTodos => {
        setTodos(visTodos);
        setIsTodosLoaded(true);
      });
  }, []);

  const filterBySelect = useCallback((todosFromServer: Todo[], option: string) => {
    return todosFromServer.filter(todo => {
      switch (option) {
        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        case 'all':
        default:
          return true;
      }
    });
  }, []);

  const filterByQuery = useCallback((visTodos: Todo[], inputQuery: string) => {
    return visTodos.filter(todo => {
      const normQuery = inputQuery.toLocaleLowerCase();

      return todo.title.toLocaleLowerCase().includes(normQuery);
    });
  }, []);

  let visibleTodos = useMemo(() => {
    return filterBySelect(todos, selectedOption);
  }, [todos, selectedOption]);

  visibleTodos = useMemo(() => {
    return filterByQuery(visibleTodos, query);
  }, [visibleTodos, query]);

  const onInfoButtonClick = useCallback((todo: Todo) => {
    getUser(todo.userId)
      .then(user => setSelectedUser(user));

    setSelectedTodo(todo);
    setIsButtonClicked(true);
  }, []);

  const onCrossButtonClick = useCallback(() => {
    setSelectedUser(null);
    setSelectedTodo(null);
    setIsButtonClicked(false);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setSelectedOption}
                onSearch={setQuery}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    onButtonClick={onInfoButtonClick}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isButtonClicked && (
        <TodoModal
          user={selectedUser}
          todo={selectedTodo}
          onCrossClick={onCrossButtonClick}
        />
      )}
    </>
  );
};
