/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [todoId, setTodoId] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }).filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
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
                todos.length < 1 ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    todoId={todoId}
                    setTodoId={setTodoId}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {todoId && (
        <TodoModal
          todos={visibleTodos}
          todoId={todoId}
          setTodoId={(todo) => setTodoId(todo)}
        />
      )}
    </>
  );
};
