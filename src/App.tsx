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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<number>(0);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [optionSelected, setOptionSelected] = useState<string>('all');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    getTodos().then(result => {
      setFilteredTodos(result);
      setTodos(result);
    });
  }, []);

  const filterByOption = (option: string): Todo[] => {
    switch (option) {
      case 'active':
        return todos.filter((todo) => todo.completed === false);
      case 'completed':
        return todos.filter((todo) => todo.completed === true);
      default: return todos;
    }
  };

  useEffect(() => {
    const filtered = filterByOption(optionSelected).filter((todo) => todo.title.toLowerCase().includes(filter.toLowerCase()));

    setFilteredTodos(filtered);
  }, [optionSelected, filter]);

  const selectedUser = () => {
    return todos.find((todo) => todo.id === selectedTodo) as Todo;
  };

  const filteredTodoFunc = (filteredStr: string) => {
    setFilter(filteredStr);
  };

  const selectedOptionTodo = (optionValue: string) => {
    setOptionSelected(optionValue);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilterValueChange={filteredTodoFunc} onSelectedOptionTodo={selectedOptionTodo} />
            </div>

            <div className="block">
              {todos.length === 0 ? <Loader />
                : <TodoList todos={filteredTodos} selectedTodo={setSelectedTodo} isModalOpen={selectedTodo > 0} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo > 0 ? (<TodoModal todo={selectedUser()} closeModalTodo={() => setSelectedTodo(0)} />) : null}
    </>
  );
};
