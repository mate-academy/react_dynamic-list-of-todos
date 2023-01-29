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
  const TODO_DEFAULT: Todo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  };

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(TODO_DEFAULT);
  const [statusFilter, setStatusFilter] = useState('all');
  const [titleFilter, setTitleFilter] = useState('');

  const loadData = () => {
    getTodos().then(result => {
      setTodosFromServer(result);
      setVisibleTodos(result);
      setIsTodosLoaded(true);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const todo = todosFromServer.find(elem => elem.id === todoId);

    if (todo !== undefined) {
      setSelectedTodo(todo);
    }
  }, [todoId]);

  useEffect(() => {
    const query = titleFilter.toLowerCase();

    const filteredTodos = [...todosFromServer].filter(todoItem => {
      const title = todoItem.title.toLowerCase();

      switch (statusFilter) {
        case 'active':
          return todoItem.completed === false && title.includes(query);
        case 'completed':
          return todoItem.completed === true && title.includes(query);
        default:
          return title.includes(query);
      }
    });

    setVisibleTodos(filteredTodos);
  }, [statusFilter, titleFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatusFilter={setStatusFilter}
                statusFilter={statusFilter}
                setTitleFilter={setTitleFilter}
                titleFilter={titleFilter}
              />
            </div>

            <div className="block">
              {!isTodosLoaded && <Loader />}
              {(isTodosLoaded && todosFromServer.length === 0) && (
                <p>No todos yet!</p>
              )}
              {(isTodosLoaded && todosFromServer.length !== 0) && (
                <TodoList todos={visibleTodos} todoId={todoId} setTodoId={setTodoId} />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && <TodoModal todo={selectedTodo} onModalClose={setTodoId} /> }
    </>
  );
};
