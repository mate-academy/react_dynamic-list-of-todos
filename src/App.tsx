import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

function getTodos(): Promise<Todo[]> {
  return fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  ).then(response => response.json());
}

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} />
            </div>

            <div className="block">{loading && <Loader />}</div>
          </div>
        </div>
      </div>
    </>
  );
};
