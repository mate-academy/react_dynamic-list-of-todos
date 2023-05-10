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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<CompletedStatus>(CompletedStatus.All);
  const [clickedTodoId, setClickedTodoId] = useState(0);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
    });
  }, []);

  const handleInput = (event: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event !== 'string') {
      setQuery(event.target.value);
    }
  };

  const handleClearInput = useCallback(() => setQuery(''), []);

  const handleUserInfo = useCallback((todo: Todo) => {
    setUserTodo(todo);
    setClickedTodoId(todo.id);
  }, []);

  let vissibleTodos = todos.filter(todo => {
    const lowerQuery = query.toLowerCase().trim();
    const lowerTitle = todo.title.toLowerCase();

    return lowerTitle.includes(lowerQuery);
  });

  if (selectedStatus !== CompletedStatus.All) {
    vissibleTodos = vissibleTodos.filter(({ completed }) => {
      switch (selectedStatus) {
        case CompletedStatus.Active:
          return !completed;

        case CompletedStatus.Completed:
          return completed;

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
              {!todos.length && <Loader />}
              <TodoList
                todos={vissibleTodos}
                onClickTodo={handleUserInfo}
                clickedTodoId={clickedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {clickedTodoId && (
        <TodoModal
          todo={userTodo}
          setClickedTodoId={setClickedTodoId}
          clickedTodoId={clickedTodoId}
        />
      )}
    </>
  );
};
