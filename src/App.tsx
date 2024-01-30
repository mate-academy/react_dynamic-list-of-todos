/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export interface Filter {
  title: string,
  status: string;
}

function getFilteredTodos(todos:Todo[], filter: Filter) {
  return todos.filter(todo => todo.title.toLowerCase().includes(filter.title.toLowerCase())
  && (filter.status === 'all' || (filter.status === 'active' && !todo.completed) || (filter.status === 'completed' && todo.completed)));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState<Filter>({ status: 'all', title: '' });
  const [loading, setLoading] = useState(false);
  const [onSelected, setSelected] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos().then(setTodos).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setSort} />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (<TodoList todos={getFilteredTodos(todos, sort)} selectedTodoId={onSelected?.id} onSelect={(todo) => setSelected(todo)} />
                )}
            </div>
          </div>
        </div>
      </div>

      {onSelected && <TodoModal selectedTodo={onSelected} onClose={() => setSelected(null)} />}
    </>
  );
};
