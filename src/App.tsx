/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterSelection, setfilterSelection] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState('');
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  const filteredArraySelection = () => {
    if (filterSelection === 'active') {
      const filterArray = [...todosFromServer].filter(todoElement => todoElement.completed === false);

      return filterArray;
    }

    if (filterSelection === 'completed') {
      const filterArray = [...todosFromServer].filter(todoElement => todoElement.completed === true);

      return filterArray;
    }

    return todosFromServer;
  };

  const onClose = () => {
    setTodo(null);
  };

  const addTodosToState = (array: Todo[]) => {
    setTodosFromServer(array);
    setTodos(array);
  };

  useEffect(() => {
    getTodos().then(result => addTodosToState(result));
  }, []);

  useEffect(() => {
    const arr = filteredArraySelection().filter(element => element.title.includes(search));

    setTodos(arr);
  }, [filterSelection, search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterSelected={setfilterSelection}
                textInput={setSearch}
              />
            </div>

            <div className="block">
              {todos
                ? <TodoList todos={todos} onTodoSelect={setTodo} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {todo && <TodoModal todo={todo} onClose={onClose} />}
    </>
  );
};
