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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState(Status.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getData = async () => {
      const todosFromServer = await getTodos();

      setIsLoading(false);
      setTodos(todosFromServer);
    };

    getData();
  }, []);

  const handleStatus = (value: Status) => {
    setFilterBy(value);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case Status.ACTIVE:
        return !todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());

      case Status.COMPLETED: {
        return todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());
      }

      default:
        return todo.title.toLowerCase().includes(query.toLowerCase());
    }
  });

  const selectTodo = (todo: number) => {
    setTodoId(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                handleStatus={handleStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={todoId}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todos={todos}
          selectedTodoId={todoId}
          selectTodo={selectTodo}
        />
      )}
    </>
  );
};
