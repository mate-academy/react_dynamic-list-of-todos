/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoContext } from './TodoContext/TodoContext';
import { Filter } from './types/Filter';

function prepareTodos(todos: Todo[], querry = '', filter = Filter.All): Todo[] {
  let copy = [...todos];
  const normalizedQerry = querry.trim().toLowerCase();

  if (normalizedQerry) {
    copy = copy.filter(todo => todo.title.toLowerCase().includes(normalizedQerry));
  }

  if (filter !== Filter.All) {
    copy = copy.filter(todo => {
      if (filter === Filter.Active) {
        return todo.completed === false;
      }

      if (filter === Filter.Completed) {
        return todo.completed === true;
      }

      return true;
    });
  }

  return copy;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const isTodoLoaded = todos.length > 0;
  const [currentFilter, setCurrentFilter] = useState(Filter.All);
  const [currentQuerry, setCurrentQuerry] = useState('');
  const { selectedTodo: shownTodo } = useContext(TodoContext);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const changeQuerry = (newQerry: string):void => {
    setCurrentQuerry(newQerry);
  };

  const changeFilter = (newFilter: Filter):void => {
    setCurrentFilter(newFilter);
  };

  const preparedTodos = prepareTodos(todos, currentQuerry, currentFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter changeFilter={changeFilter} changeQuerry={changeQuerry} />
            </div>

            <div className="block">
              {!isTodoLoaded && (<Loader />)}
              {isTodoLoaded && (<TodoList items={preparedTodos} />)}
            </div>
          </div>
        </div>
      </div>

      {shownTodo && (<TodoModal />)}
    </>
  );
};
