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

export const App: React.FC = () => {
  const [todos, setTodos]
   = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [cases, setCase] = useState('');
  const [query, setQuery] = useState('');
  const [button, setButton] = useState(false);
  const [todoObj, setTodoObj] = useState(todos[0]);
  let array = todos;

  useEffect(() => {
    async function getTodo() {
      const fetchedData = await getTodos();

      setTodos(fetchedData);
      setLoading(false);
    }

    getTodo();
  }, []);

  const setCurrentCase = (currentCase: string) => {
    setCase(currentCase);
  };

  const setCurrentQuery = (currentQuery: string) => {
    setQuery(currentQuery);
  };

  switch (cases) {
    case 'all':
      array = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase().trim());
      });
      break;
    case 'active':
      array = todos.filter((todo) => {
        return (
          query.length === 0
            ? todo.completed === false
            : todo.completed === false
             && todo.title.toLowerCase().includes(query.toLowerCase().trim())
        );
      });
      break;
    case 'completed':
      array = todos.filter((todo) => {
        return (
          query.length === 0
            ? todo.completed === true
            : todo.completed === true
             && todo.title.toLowerCase().includes(query.toLowerCase().trim())
        );
      });
      break;
    default:
      array = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase().trim());
      });
      break;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                setCurrentCase={setCurrentCase}
                setCurrentQuery={setCurrentQuery}
                cases={cases}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={array}
                    setButton={setButton}
                    setTodoObj={setTodoObj}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {button && (
        <TodoModal
          setButton={setButton}
          todoObj={todoObj}
        />
      )}
    </>
  );
};
