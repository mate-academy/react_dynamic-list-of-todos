/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './service/todo';
import { Todo } from './types/Todo';

const handleFilter = (
  todoList: Todo[] | Todo,
  value?: string,
  completed?: string,
) => {
  const todoLis = Array.isArray(todoList) ? todoList : [todoList];
  let newTodos = todoLis;

  if (value) {
    newTodos = newTodos.filter(todo =>
      todo.title.toLowerCase().includes(value.toLowerCase()),
    );
  }

  if (completed && completed !== 'all') {
    const status = completed === 'active' ? false : true;

    newTodos = newTodos.filter(todo => todo.completed === status);
  }

  return newTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo | Todo[]>([]);
  const [loaderState, setLoaderState] = useState(true);
  const [selectTodos, setSelectTodos] = useState<Todo>();
  const [value, setValue] = useState<string>('');
  const [completed, setCompleted] = useState<string>('');

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoaderState(false);
    });
  }, []);

  const todosVisinle = handleFilter(todos, value, completed);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={(newValue: string, newCompleted: string) => {
                  setValue(newValue);
                  setCompleted(newCompleted);
                }}
              />
            </div>

            <div className="block">
              {loaderState && <Loader />}
              <TodoList
                todos={todosVisinle as Todo[]}
                selectedTodo={selectTodos}
                onSelectTodo={setSelectTodos}
              />
            </div>
          </div>
        </div>
      </div>
      {selectTodos && (
        <TodoModal
          select={selectTodos}
          onClose={() => setSelectTodos(undefined)}
        />
      )}
    </>
  );
};
