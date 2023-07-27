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
import { FilterBy } from './components/utiles/FilterBy';

const getFilerTodos = (
  todos: Todo[],
  qerty: string,
  filterBy: FilterBy,
  ) => {
    let newTodos = [...todos];

    if(qerty) {
      const newQerty = qerty.toLowerCase().trim();

      newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(newQerty));
    }

    switch( filterBy ) {
      case 'active':
      return newTodos.filter(todo => !todo.completed);

      case 'completed':
      return newTodos.filter(todo => todo.completed);

      default:
        break;
    }

    return newTodos;
  }

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo | null >(null);
  const [qerty, setQerty] = useState<string>('');
  const [filerBy, setFilerBy] = useState(FilterBy.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
    .then(setTodos)
    .catch(() => {
      throw new Error('Please try latter');
    })
    .finally(() => setLoading(false));
  }, []);

  const filerTodos = getFilerTodos(todos, qerty, filerBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                qerty={qerty}
                setQerty={setQerty}
                filterBy={filerBy}
                setFilterBy={setFilerBy}
              />
            </div>

            <div className="block">
              {loading
              ? <Loader />
              :(
                <TodoList
                  todos={filerTodos}
                  selectTodo={selectTodo}
                  whenTodoShow={setSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo &&(
      <TodoModal
        closedTodo={setSelectTodo}
        selectTodo={selectTodo}
      />
      )}
    </>
  );
};
