/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function preperTodos(todos:Todo[], sortText: string, sortFilter:string) {
  return todos.filter(todo => todo.title.toLowerCase().includes(sortText.toLowerCase()))
    .filter(todo => {
      switch (sortFilter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
}
// const visibelTodosText:Todo[] = todos.filter(todo => todo.title.toLowerCase().includes(sortText.toLowerCase()));

//   const visibelTodos = visibelTodosText.filter(todo => {
//     switch (sortFilter) {
//       case 'Active':
//         return !todo.completed;

//       case 'Completed':
//         return todo.completed;

//       default:
//         return true;
//     }
//   });

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [sortFilter, setSortFilter] = useState('all');
  const [sortText, setSortText] = useState('');

  const handleActiveTodo = (todo:Todo) => (
    activeTodo !== todo
    && setActiveTodo(todo)
  );

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .finally(() => {
        setLoader(true);
      });
  }, []);

  // eslint-disable-next-line no-console
  console.log(todos);

  const visibelTodos:Todo[] = useMemo(() => (
    preperTodos(
      todos,
      sortText,
      sortFilter,
    )
  ), [todos, sortText, sortFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortFilter={setSortFilter}
                sortFilter={sortFilter}
                setSortText={setSortText}
                sortText={sortText}
              />
            </div>

            <div className="block">
              {isLoader
                ? (
                  <TodoList
                    visibelTodos={visibelTodos}
                    handleActiveTodo={handleActiveTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>
      {activeTodo !== null
        && (
          <TodoModal
            activeTodo={activeTodo}
            setActiveTodo={setActiveTodo}
          />
        )}
    </>
  );
};
