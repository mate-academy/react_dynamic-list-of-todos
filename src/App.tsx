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

const TODOS_DEFAULT: Todo[] = [];

const TODO_DEFAULT: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(TODOS_DEFAULT);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [todoId, setTodoId] = useState(0);
  const [todo, setTodo] = useState(TODO_DEFAULT);
  const [statusFilter, setStatusFilter] = useState('all');
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
      setVisibleTodos(result);
    });
  }, []);

  useEffect(() => {
    const selectedTodo = todos.find(elem => elem.id === todoId);

    if (selectedTodo !== undefined) {
      setTodo(selectedTodo);
    }
  }, [todoId]);

  useEffect(() => {
    let filteredTodos = [...todos].filter(todoItem => {
      switch (statusFilter) {
        case 'active':
          return todoItem.completed === false;
        case 'completed':
          return todoItem.completed === true;
        default:
          return todoItem;
      }
    });

    filteredTodos = filteredTodos.filter(todoItem => {
      const query = titleFilter.toLowerCase();
      const title = todoItem.title.toLowerCase();

      return title.includes(query);
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
              <TodoFilter setStatusFilter={setStatusFilter} statusFilter={statusFilter} setTitleFilter={setTitleFilter} titleFilter={titleFilter} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList todos={visibleTodos} todoId={todoId} setTodoId={setTodoId} />
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && <TodoModal todo={todo} onModalClose={setTodoId} /> }
    </>
  );
};
