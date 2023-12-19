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

enum FilterChecker {
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [listOfTodos, setListOFTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [showing, setShowing] = useState(-1);
  const [filter, setFilter] = useState('All');
  const [input, setInput] = useState('');
  const displayedTodo = listOfTodos.find(todo => todo.id === showing) || null;

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then((todoList) => setListOFTodos(todoList))
      .finally(() => setLoadingTodos(false));
  }, []);

  const filterTodos = (list: Todo[]) => {
    let listCopy = list;

    switch (filter) {
      case FilterChecker.active:
        listCopy = listCopy.filter(todo => !todo.completed);
        break;
      case FilterChecker.completed:
        listCopy = listCopy.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (input) {
      listCopy = listCopy.filter(todo => todo.title.toLowerCase().includes(input.toLowerCase()));
    }

    return listCopy;
  };

  const filteredListOfTodos = filterTodos(listOfTodos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter value={input} changeFilter={setFilter} changeInput={setInput} />
            </div>

            <div className="block">
              {loadingTodos && (<Loader />)}
              {!loadingTodos
              && listOfTodos.length > 0
              && (<TodoList todos={filteredListOfTodos} displayedTodo={displayedTodo} changeShowing={setShowing} />)}
            </div>
          </div>
        </div>
      </div>

      <TodoModal displayedTodo={displayedTodo} changeShowing={setShowing} />
    </>
  );
};
