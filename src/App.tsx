/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const debounce = (f: (...args: string[]) => void, delay: number | undefined) => {
  let timerId: NodeJS.Timeout;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [choosenTodoId, setChoosenTodoId] = useState(0);
  const [selectFilter, setSelectFilter] = useState('all');

  const applyQuery = debounce(setAppliedQuery, 1000);

  const choseenTodo = useMemo(() => {
    return todos.find(todo => todo.id === choosenTodoId);
  }, [choosenTodoId, todos]);

  const reset = useCallback(() => {
    setQuery('');
    setAppliedQuery('');
  }, []);

  const getsTodos = useCallback(async () => {
    const allTodos = await getTodos();

    setTodos(allTodos);
  }, []);

  useEffect(() => {
    getsTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const text = appliedQuery.toLowerCase().trim();
      const toLowerTitle = todo.title.toLowerCase();
      const completedTodo = todo.completed;

      switch (selectFilter) {
        case 'all':
          return toLowerTitle.includes(text);
        case 'active':
          return toLowerTitle.includes(text)
            && !completedTodo;
        case 'completed':
          return toLowerTitle.includes(text)
            && completedTodo;
        default:
          return false;
      }
    });
  }, [todos, appliedQuery, selectFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectFilter={selectFilter}
                filterTodos={setSelectFilter}
                searchText={query}
                setSearchText={setQuery}
                applyQuery={applyQuery}
                reset={reset}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSelect={setChoosenTodoId}
                    selectedTodoId={choosenTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {choosenTodoId ? (
        <TodoModal
          todo={choseenTodo}
          onClose={setChoosenTodoId}
        />
      ) : ''}
    </>
  );
};
