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

enum FilterType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filter, setFilter] = useState<FilterType>(FilterType.all);
  const [querry, setQuerry] = useState('');

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getTodos().then(todo => {
      setTodos(todo);
      setLoader(false);
    });
  }, []);

  const visibleTodos = todos
    .filter(item => {
      switch (filter) {
        case FilterType.active:
          return !item.completed;
        case FilterType.completed:
          return item.completed;
        case FilterType.all:
        default:
          return true;
      }
    })
    .filter(newItem => {
      return newItem.title.toLowerCase().includes(querry.toLowerCase());
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterValue={itemFromFilter => {
                  setFilter(itemFromFilter as FilterType);
                }}
                onQuerryValue={querryFromFilter => setQuerry(querryFromFilter)}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? 0}
                  onModal={id => {
                    const todo = todos.find(item => item.id === id);

                    if (todo) {
                      setSelectedTodo(todo);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal post={selectedTodo} onClick={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
