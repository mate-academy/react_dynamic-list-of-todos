/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SelectTypes } from './types/selectTypes';

const filterFunction = (todos: Todo[], filterType: SelectTypes, enteredQuery: string) => {
  let visibleTodos = [...todos];
  const query = enteredQuery.toLowerCase();

  switch (filterType) {
    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    default:
      break;
  }

  return visibleTodos.filter(todo => todo.title.toLowerCase().includes(query));
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState<SelectTypes>('all');
  const [query, setQuery] = useState('');

  const setActivityFilter = (filterValue: SelectTypes) => {
    setSelect(filterValue);
  };

  const setCurrentQuery = (value: string) => {
    setQuery(value);
  };

  const focusOnTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const unFocusOnTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();

      setTodos(data);
      setIsLoading(true);
    };

    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onInputChange={setCurrentQuery}
                onSelectChange={setActivityFilter}
              />
            </div>

            <div className="block">
              {!isLoading ? <Loader /> : (
                <TodoList
                  todos={filterFunction(todos, select, query)}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={focusOnTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={unFocusOnTodo}
        />
      )}
    </>
  );
};
