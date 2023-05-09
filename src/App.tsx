/* eslint-disable max-len */
import {
  useEffect,
  useState,
  FC,
  ChangeEvent,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { CompletedStatus } from './types/CompletedStatus';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<CompletedStatus>(CompletedStatus.All);
  const [isClickedTodoInfo, setIsClickedTodoInfo] = useState(false);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const resultPromise = getTodos();

    resultPromise.then(result => {
      setTodos(result);
    });
  }, []);

  const handleInput = (event: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event !== 'string') {
      setQuery(event.target.value);
    }
  };

  const handleClearInput = useCallback(() => setQuery(''), []);

  const handleUserInfo = useCallback((isClicked: boolean, todo: Todo) => {
    setIsClickedTodoInfo(isClicked);
    setUserTodo(todo);
  }, []);

  let vissibleTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase().trim();

    vissibleTodos = vissibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerQuery)
    ));
  }

  if (selectedStatus !== CompletedStatus.All) {
    vissibleTodos = vissibleTodos.filter(todo => {
      switch (selectedStatus) {
        case CompletedStatus.Active:
          return todo.completed === false;

        case CompletedStatus.Completed:
          return todo.completed === true;

        default: return null;
      }
    });
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeInput={handleInput}
                query={query}
                onClearInput={handleClearInput}
                selectedOption={selectedStatus}
                onSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={vissibleTodos}
                    onClickUser={handleUserInfo}
                    isClickedTodoInfo={isClickedTodoInfo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isClickedTodoInfo && (
        <TodoModal
          onClickModal={setIsClickedTodoInfo}
          todo={userTodo}
        />
      )}
    </>
  );
};
