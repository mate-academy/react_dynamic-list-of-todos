/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [queryFiltred, setQueryFiltred] = useState('');
  const [selectFiltred, setSelectFiltred] = useState('');
  const [selectId, setSelectId] = useState<number | null>(null);

  const onChangeQuery = useCallback((qr: string) => {
    setQueryFiltred(qr);
  }, []);

  const onChangeSelect = useCallback((sl: string) => {
    setSelectFiltred(sl);
  }, []);

  const onSelectedTodo = useCallback((id: number | null) => {
    setSelectId(id);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(tds => {
        setTodos(tds);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizeQuery = queryFiltred.toLowerCase().trim();

    let filtredTds = queryFiltred
      ? todos.filter(td => td.title.toLowerCase().includes(normalizeQuery))
      : todos;

    switch (selectFiltred) {
      case 'active':
        filtredTds = filtredTds.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtredTds = filtredTds.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filtredTds;
  }, [queryFiltred, todos, selectFiltred]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={onChangeQuery}
                onChangeSelect={onChangeSelect}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  selectId={selectId}
                  onSelectedTodo={onSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectId && (
        <TodoModal selectId={selectId} onSelectedTodo={onSelectedTodo} />
      )}
    </>
  );
};
