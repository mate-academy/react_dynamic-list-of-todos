import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { Options } from './types/Options';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { filteredTodos } from './components/utils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentTodo, setcurrentTodo] = useState<Todo | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<Options>(Options.ALL);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      // eslint-disable-next-line no-alert
      alert('Sorry, there is no todos yet');
    } finally {
      setIsDataReady(true);
    }
  };

  const loadUserInfo = async (userId:number) => {
    const userFromServer = await getUser(userId);

    setUser(userFromServer);
    setIsDataReady(true);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos, option, query);
  }, [todos, option, query]);

  const onTodoBtnClick = (userId: number, todo:Todo) => {
    setcurrentTodo(todo);

    loadUserInfo(userId);
  };

  const closeModal = () => {
    setUser(null);
    setcurrentTodo(null);
  };

  const selectedTodos = useCallback((selectedOption: Options) => {
    setOption(selectedOption);
  }, [option]);

  const filterByQuery = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, [query]);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectedOption={selectedTodos}
                onInputChange={filterByQuery}
                inputValue={query}
                onClearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {!isDataReady && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={currentTodo}
                clickHandler={onTodoBtnClick}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          user={user}
          todo={currentTodo}
          onCloseBtn={closeModal}
        />
      )}
    </>
  );
};
