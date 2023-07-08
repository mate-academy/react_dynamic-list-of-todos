/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

import { getTodos } from './api';

const getFilteredTodos = (
  todos: Todo[],
  sortType: SortType,
  query: string,
) => {
  let visibleTodos = [...todos];

  switch (sortType) {
    case SortType.ACTIVE: {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;
    }

    case SortType.COMPLETED: {
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    }

    case SortType.ALL:
    default: {
      break;
    }
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(SortType.ALL);

  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isModalShowed, setIsModalShowed] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const filteredTodos = getFilteredTodos(todos, sortType, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortType={sortType}
                query={query}
                onQueryChange={(inputQuery: string) => setQuery(inputQuery)}
                onSelectChange={(selectValue: SortType) => setSortType(selectValue)}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={(todoId: number) => setSelectedTodoId(todoId)}
                  showModal={(param: boolean) => setIsModalShowed(param)}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShowed && (
        <TodoModal
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={(todoId: number) => setSelectedTodoId(todoId)}
          setIsModalShowed={(param: boolean) => setIsModalShowed(param)}
        />
      )}
    </>
  );
};
