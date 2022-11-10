import React, {
  useState,
  useEffect,
  useMemo,
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
import { TodoStatus } from './types/TodoStatus';

type Callback = (newQuery: string) => void;

function debaunce(f: Callback, delay: number) {
  let timerId: number;

  return (...args: []) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(f, delay, ...args);
  };
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoid] = useState(0);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [select, setSelect] = useState<TodoStatus>(TodoStatus.ALL);

  const applyQuery = useCallback(
    debaunce(setAppliedQuery, 500), [],
  );

  useEffect(() => {
    getTodos().then(todoList => setTodos(todoList));
  }, []);

  const currentTodo = useMemo(() => {
    return todos.find(todo => (todo.id === todoId));
  }, [todoId, query]);

  const closeModal = () => {
    setTodoid(0);
  };

  const onQueryChange = useCallback((changedQuery: string) => {
    setQuery(changedQuery);
  }, []);

  const onSelectChange = useCallback((changedSelect) => {
    setSelect(changedSelect);
  }, []);

  const getVisibleTodos = () => {
    const selectedBy = todos.filter(({ title }) => {
      const titleToLowerCase = title.toLowerCase();
      const queryToLowerCase = query.toLowerCase();

      return titleToLowerCase.includes(queryToLowerCase);
    });

    return selectedBy.filter(todo => {
      switch (select) {
        case TodoStatus.ACTIVE:
          return !todo.completed;

        case TodoStatus.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, appliedQuery, select],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={onQueryChange}
                onSelectChange={onSelectChange}
                onApplyQuery={applyQuery}
                query={query}
                select={select}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectTodo={(id:number) => setTodoid(id)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          onCloseModal={closeModal}
        />
      )}
    </>
  );
};
