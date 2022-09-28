/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>(todos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(json => {
        setTodos(json);
        setSortedTodos(json);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              todos={todos}
              setSortedTodos={setSortedTodos}
            />
          </div>

          <div className="block">
            {isLoaded ? <TodoList todos={sortedTodos} /> : <Loader />}
            {!sortedTodos.length && <strong>None such TODO</strong>}
          </div>
        </div>
      </div>
    </div>
  );
};
