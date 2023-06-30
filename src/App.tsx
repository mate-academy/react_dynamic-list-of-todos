/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './components/App.scss';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState<FilterBy>(FilterBy.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
      setIsLoaded(true);
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(actualTodo => {
      switch (selectFilter) {
        case FilterBy.All:
          return actualTodo.title.includes(query);
        case FilterBy.Completed:
          return actualTodo.title.includes(query) && actualTodo.completed;
        case FilterBy.Active:
          return actualTodo.title.includes(query) && !actualTodo.completed;
        default:
          return todos;
      }
    });
  }, [query, todos, selectFilter]);

  const findTodo = (todoId: number) => {
    const foundTodo = todos.find(possibleTodo => todoId === possibleTodo.id);

    if (foundTodo !== undefined) {
      setSelectedTodo(foundTodo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={query}
                selectedFilter={selectFilter}
                onSelectStatus={setSelectFilter}
                onChangeInput={setQuery}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    onSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                    todos={filteredTodos}
                    onFind={findTodo}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal setSelectedTodo={setSelectedTodo} todo={selectedTodo} />}
    </>
  );
};
