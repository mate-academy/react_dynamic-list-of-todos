/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todoId, setTodoId] = useState(0);
  const [completeStatus, setCompleteStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((response) => {
        setTodos(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filtredTodos = todos.filter(todo => {
    switch (completeStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const visibleTodos = filtredTodos.filter(todo => {
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
                // todos={todos}
                completeStatus={completeStatus}
                setCompleteStatus={setCompleteStatus}
                filterText={query}
                setFilterText={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectTodo={setTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
