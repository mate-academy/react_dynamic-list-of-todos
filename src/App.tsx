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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
      setIsLoaded(true);
    };

    fetchTodos();
  }, []);

  const filterTodos = (initialTodos: Todo[]) => {
    return initialTodos.filter(actualTodo => {
      switch (selectFilter) {
        case 'all':
          return actualTodo.title.includes(query);
        case 'completed':
          return actualTodo.title.includes(query) && actualTodo.completed;
        case 'active':
          return actualTodo.title.includes(query) && !actualTodo.completed;
        default:
          return initialTodos;
      }
    });
  };

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
                    todos={filterTodos(todos)}
                    onFind={findTodo}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal closeModal={setSelectedTodo} todo={selectedTodo} />}
    </>
  );
};
