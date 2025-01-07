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

export const App: React.FC = () => {
  //#region state for TodoFilter
  const [filterTodo, setFilterTodo] = useState('');
  const [filterBySelect, setFilterBySelect] = useState('all');
  //#endregion

  //#region  state for TodoList
  const [todosLists, setTodosLists] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  //#endregion

  //#region state for Loader
  const [loading, setLoading] = useState(false);
  //#endregion

  //#region  useEffect for Todo and filtered Todo
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getTodos();

        setTodosLists(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterTodos = () => {
    let filteredTodo = todosLists.filter(todoList =>
      todoList.title.toLowerCase().includes(filterTodo.trim().toLowerCase()),
    );

    if (filterBySelect === 'completed') {
      filteredTodo = filteredTodo.filter(
        todoList => todoList.completed === true,
      );
    }

    if (filterBySelect === 'active') {
      filteredTodo = filteredTodo.filter(
        todoList => todoList.completed === false,
      );
    }

    return filteredTodo;
  };

  const filteredTodos = filterTodos();
  //#endregion

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodo={filterTodo}
                setFilterTodo={setFilterTodo}
                filterBySelect={filterBySelect}
                setFilterBySelect={setFilterBySelect}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todosLists && (
                <TodoList
                  todosLists={filteredTodos}
                  todo={todo}
                  setTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} setTodo={setTodo} />}
    </>
  );
};
