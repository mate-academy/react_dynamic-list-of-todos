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
import { User } from './types/User';
import { Select } from './types/Select';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [selectedTodo, setTodoModal] = useState<Todo>();
  const [user, setUser] = useState<User | null>(null);
  const [inicializationModal, setInicModal] = useState(false);
  const [filterSelect, setFilterSelect] = useState<Select | string>(Select.all);
  const [inputSelect, setInputSelect] = useState<string>('');
  const [filteringList, setFilteringList] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos()
      .then(array => {
        setTodoList(array);
      });
  }, []);

  useEffect(() => {
    if (todoList) {
      const filteringArray = [...todoList].filter(todo => {
        switch (filterSelect) {
          case Select.active:
            return todo.completed === false;
          case Select.completed:
            return todo.completed === true;
          default:
            return true;
        }
      });

      const filterInput = [...filteringArray].filter(todo => {
        const lowerCase = todo.title.toLowerCase();

        return lowerCase.includes(inputSelect.toLowerCase());
      });

      setFilteringList(filterInput);
    }
  }, [todoList, filterSelect, inputSelect]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterSelect={setFilterSelect}
                setInputSelect={setInputSelect}
                inputSelect={inputSelect}
              />
            </div>

            <div className="block">
              {todoList === null ? (<Loader />) : (
                <TodoList
                  todos={filteringList}
                  setInicializationModal={setInicModal}
                  setTodoModal={setTodoModal}
                  selectedTodo={selectedTodo}
                  setUser={setUser}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {inicializationModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          setInicializationModal={setInicModal}
          setTodoModal={setTodoModal}
          setUser={setUser}
          user={user}
        />
      )}
    </>
  );
};
