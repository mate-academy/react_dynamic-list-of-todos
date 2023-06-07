/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [openTodo, setOpenTodo] = useState<boolean>(false);
  const [crossClicked, setCrossClicked] = useState<boolean>(false);

  const [selectedTodo, setSetectedTodo] = useState<Todo>();

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    };

    fetchData();
  }, []);

  const onChosenFilter = (data: string) => {
    setFilter(data);
  };

  const onQuery = (data: string) => {
    setQuery(data);
  };

  const onChosenTodo = (todo: Todo) => {
    setSetectedTodo(todo);
    setOpenTodo(true);
    setCrossClicked(true);
  };

  const todoModalClick = () => {
    setOpenTodo(false);
    setCrossClicked(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChosenFilter={onChosenFilter}
                onQuery={onQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    filter={filter}
                    query={query}
                    onChosenTodo={onChosenTodo}
                    crossClicked={crossClicked}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo !== undefined
        && openTodo
        && (
          <TodoModal
            todo={selectedTodo}
            handleDeleteClick={todoModalClick}
          />
        )
      }
    </>
  );
};
