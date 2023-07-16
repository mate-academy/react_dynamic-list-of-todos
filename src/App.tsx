/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FilterType.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const filterTodos = () => {
    let newTodos = [...todos];

    const queryNormal = query.toLowerCase().trim();

    if (queryNormal) {
      newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(queryNormal));
    }

    switch (selectedFilter) {
      case FilterType.ACTIVE:
        return newTodos.filter(todo => !todo.completed);

      case FilterType.COMPLETED:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleDataModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const visibleTodos = filterTodos();

  const getTodoList = async () => {
    try {
      const arrTodo = await getTodos();

      setIsLoading(false);

      setTodos(arrTodo);
    } catch {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      selectedTodo={selectedTodo}
                      todos={visibleTodos}
                      setIsOpenModal={setIsOpenModal}
                      handleDataModal={handleDataModal}
                    />
                  )
              }

            </div>
          </div>
        </div>
      </div>

      {
        isOpenModal && (
          <TodoModal
            clearTodo={clearSelectedTodo}
            selectedTodo={selectedTodo}
            setIsOpenModal={setIsOpenModal}
          />
        )

      }
    </>
  );
};
