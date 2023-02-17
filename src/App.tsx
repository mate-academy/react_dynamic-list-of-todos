/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [typeOfTodos, setTypeOfTodos] = useState('all');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todoToShow, setTodoToShow] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeOfTodos(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterClear = () => {
    setFilter('');
  };

  const groupedTodos = typeOfTodos === 'all'
    ? todos
    : todos.filter(({ completed }) => (typeOfTodos === 'completed' ? completed : !completed));

  const filteredTodos = filter === ''
    ? groupedTodos
    : groupedTodos.filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                option={typeOfTodos}
                onSelectChange={handleTypeChange}
                filter={filter}
                onFilterChange={handleFilterChange}
                onFilterClear={handleFilterClear}
              />
            </div>

            <div className="block">
              {
                isLoading && <Loader />
              }
              <TodoList
                todos={filteredTodos}
                onButtonClick={(todo) => setTodoToShow(todo)}
                todoToShow={todoToShow}
              />
            </div>
          </div>
        </div>
      </div>
      {
        todoToShow && <TodoModal todo={todoToShow} onButtonClick={(todo) => setTodoToShow(todo)} />
      }
    </>
  );
};
