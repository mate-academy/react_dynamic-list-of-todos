/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { SelectType } from './types/Enum';
import { getTodos } from './api';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  function getVisibleTodos(todos: Todo[]): void {
    const normalizeFilter = filter.trim().toLowerCase();
    let visibleTodos = [...todos];

    if (normalizeFilter) {
      visibleTodos = visibleTodos.filter((todo) => todo.title.toLowerCase().includes(normalizeFilter));
    }

    switch (selectedType) {
      case SelectType.Active:
        visibleTodos = visibleTodos.filter((todo) => !todo.completed);
        break;
      case SelectType.Completed:
        visibleTodos = visibleTodos.filter((todo) => todo.completed);
        break;

      default:
        break;
    }

    setTodoList(visibleTodos);
  }

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(getVisibleTodos)
      .catch(() => setError('Try again later'))
      .finally(() => setLoading(false));
  }, [filter, selectedType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                filter={filter}
                setSelectedType={setSelectedType}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todoList && !error && (
                <TodoList
                  todoList={todoList}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />
      )}
    </>
  );
};
