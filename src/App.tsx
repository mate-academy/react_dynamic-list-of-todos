/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filters';

const filteredTodos = (tasks: Todo[], filter: Filter, query: string) => {
  const queryLowerCase = query.trim().toLocaleLowerCase();
  const filteredTasks = tasks.filter(task => {
    const isTitleMatch = task.title
      .toLocaleLowerCase()
      .includes(queryLowerCase);

    if (filter === 'active') {
      return !task.completed && (!queryLowerCase || isTitleMatch);
    } else if (filter === 'completed') {
      return task.completed && (!queryLowerCase || isTitleMatch);
    } else {
      return !queryLowerCase || isTitleMatch;
    }
  });

  return filteredTasks;
};

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Filter>('all');
  const [searchInputValue, setSearchInput] = useState('');
  const [isloading, setIsloading] = useState(true);

  const newTodos = filteredTodos(todos, visibleTodos, searchInputValue);

  useEffect(() => {
    setIsloading(true);
    getTodos()
      .then(data => setTodos(data))
      .catch(error => {
        throw new Error(`${error} ups... can't load todos`);
      })
      .finally(() => setIsloading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInputValue={searchInputValue}
                setSearchInput={setSearchInput}
                setVisibleTodos={setVisibleTodos}
              />
            </div>

            <div className="block">
              {isloading && <Loader />}
              {!isloading && todos.length && (
                <TodoList todo={todo} todos={newTodos} setTodo={setTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} setTodo={setTodo} />}
    </>
  );
};
