/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './components/App.scss';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');
  const [openModal, setOpenModal] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
      setIsLoaded(!isLoaded);
    };

    fetchTodos();
  }, []);

  const filterTodos = (initialTodos: Todo[]) => {
    switch (selectFilter) {
      case 'all':
        return initialTodos.filter(actualTodo => actualTodo.title.includes(query));
      case 'completed':
        return initialTodos.filter(actualTodo => actualTodo.title.includes(query) && actualTodo.completed);
      case 'active':
        return initialTodos.filter(actualTodo => actualTodo.title.includes(query) && !actualTodo.completed);
      default:
        return initialTodos;
    }
  };

  const findTodo = (todoId: number) => {
    const foundTodo = todos.find(possibleTodo => todoId === possibleTodo.id);

    if (foundTodo !== undefined) {
      setTodo(foundTodo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter value={query} selectValue={selectFilter} onSelect={setSelectFilter} onChange={setQuery} />
            </div>

            <div className="block">
              {!isLoaded ? <Loader /> : ''}
              {isLoaded && (<TodoList opened={openModal} onOpen={setOpenModal} todos={filterTodos(todos)} onFind={findTodo} />)}
            </div>
          </div>
        </div>
      </div>

      {(openModal && todo) && (<TodoModal onOpen={setOpenModal} todo={todo} />)}
    </>
  );
};
