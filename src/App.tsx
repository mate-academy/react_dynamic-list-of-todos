/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function lowerCompare(str: string, part: string): boolean {
  return str
    .toLowerCase()
    .includes(part.toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [todo, setTodo] = useState<Todo | null>(null);

  const [filterBy, setFilterBy] = useState<string>('all');

  const [query, setQuery] = useState<string>('');

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  useEffect((() => {
    switch (filterBy) {
      case 'all':
        setVisibleTodos(todos.filter(({ title }) => lowerCompare(title, query)));
        break;
      case 'active':
        setVisibleTodos(todos
          .filter(({ completed }) => !completed)
          .filter(({ title }) => lowerCompare(title, query)));
        break;
      case 'completed':
        setVisibleTodos(todos
          .filter(({ completed }) => completed)
          .filter(({ title }) => lowerCompare(title, query)));
        break;
      default:
        throw new Error('Warning!');
    }
  }), [todos, filterBy, query]);

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
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  callbackTodo={setTodo}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={todo} callbackTodo={setTodo} />
    </>
  );
};
