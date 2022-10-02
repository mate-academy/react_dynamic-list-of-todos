/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(result => {
        setTodos(result);
        setIsLoaded(true);
      });
  }, []);

  const lowerCompare = useCallback((str: string) => (
    str.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  const filterTodos = useMemo(() => (
    todos
      .filter(todoItem => {
        if (filterBy === 'active') {
          return !todoItem.completed;
        }

        if (filterBy === 'completed') {
          return todoItem.completed;
        }

        return todoItem;
      })
      .filter(todoItem => (
        lowerCompare(todoItem.title)
      ))
  ), [todos, filterBy, lowerCompare]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                !isLoaded
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filterTodos}
                      selectedTodo={todo}
                      setSelectedTodo={setTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {todo?.userId && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
