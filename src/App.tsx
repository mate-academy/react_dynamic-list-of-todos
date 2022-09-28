import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export function checkQuery(query:string, content:string) {
  return (content.toLowerCase())
    .includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setIsLoaded(true);
    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos
    .filter(({ completed }) => {
      switch (filterBy) {
        case 'active':
          return !completed;

        case 'completed':
          return completed;

        default:
          return true;
      }
    })
    .filter(({ title }) => {
      return checkQuery(query, title);
    });

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
                      todos={filteredTodos}
                      selectedTodoId={todoId}
                      selectTodo={(todosId) => {
                        setTodoId(todosId);
                      }}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={filteredTodos}
          setTodoId={setTodoId}
        />
      )}

    </>
  );
};
