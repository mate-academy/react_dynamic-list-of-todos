/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { TodoModal } from './components/TodoModal/TodoModal';
import { getFilteredList } from './components/helpers/helpres';
import { FilterConditions } from './enums/FilterCondition';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterConditions>(
    FilterConditions.All,
  );
  const [query, setQuery] = useState('');

  const filteredTodos = getFilteredList(todos, selectedFilter, query);

  const loadDataFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setLoading(false);
  };

  useEffect(() => {
    loadDataFromServer();
  }, []);

  const showModalWindow = (todoObj: Todo) => {
    setTodo(todoObj);
  };

  const closeModalWindow = () => {
    setTodo(null);
  };

  const isLoading = loading ? <Loader /> : null;
  const content = !loading ? (
    <TodoList
      todos={filteredTodos}
      showModalWindow={showModalWindow}
      isTodoSelected={todo?.id}
    />
  ) : null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading}
              {content}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={todo} closeModalWindow={closeModalWindow} />
    </>
  );
};
