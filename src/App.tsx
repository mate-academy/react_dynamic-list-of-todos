/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterValues } from './types/FilterValues';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [hasLoading, setHasLoading] = useState(false);
  const [filterByCompleted, setFilterByCompleted] = useState(FilterValues.all);
  const [filterByTitle, setFilterByTitle] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [hasUncorrectLink, setHasUncorrectLink] = useState(false);

  useEffect(() => {
    setHasLoading(true);
    getTodos()
      .then(res => {
        const filteredTodos = res.filter(todo => {
          switch (filterByCompleted) {
            case 'all':
              return true;

            case 'active':
              return !todo.completed;

            case 'completed':
              return todo.completed;

            default:
              return false;
          }
        }).filter(todo => {
          const generalQuery = filterByTitle.toLocaleLowerCase();
          const generalTitle = todo.title.toLocaleLowerCase();

          return generalTitle.includes(generalQuery);
        });

        setVisibleTodos(filteredTodos);
      })
      .catch(() => {
        setVisibleTodos([]);
        setHasUncorrectLink(true);
      })
      .finally(() => {
        setHasLoading(false);
      });
  }, [filterByCompleted, filterByTitle]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByCompleted={filterByCompleted}
                onFilterByCompleted={(v) => setFilterByCompleted(v)}
                filterByTitle={filterByTitle}
                onFilterByTitle={v => setFilterByTitle(v)}

              />
            </div>

            {hasUncorrectLink
              ? (<p>Can&apos;t load Todos with server...</p>)
              : (
                <div className="block">
                  {hasLoading
                    ? (<Loader />)
                    : (
                      <TodoList
                        todos={visibleTodos}
                        selectTodo={selectTodo}
                        onSelectTodo={(todo) => setSelectTodo(todo)}
                      />
                    )}
                </div>
              )}
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          onSelectTodo={(todo) => setSelectTodo(todo)}
        />
      )}
    </>
  );
};
