/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterField, setFilterField] = useState('all');
  const [applQuery, setApplQuery] = useState('');
  const [checkedTodo, setCheckedTodo] = useState<Todo | null>(null);

  const filtredTodos = useMemo(() => {
    const filtredList =
      todos && todos.filter(p => p.title.toLowerCase().includes(applQuery));

    switch (filterField) {
      case 'active':
        return filtredList?.filter(t => t.completed === false);
      case 'completed':
        return filtredList?.filter(t => t.completed === true);
      default:
        return filtredList;
    }
  }, [todos, filterField, applQuery]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={setFilterField} onHandle={setApplQuery} />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && (
                <TodoList
                  todos={filtredTodos}
                  checkedTodo={checkedTodo}
                  onCheck={setCheckedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {checkedTodo && <TodoModal todo={checkedTodo} onCheck={setCheckedTodo} />}
    </>
  );
};
