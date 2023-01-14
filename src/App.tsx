/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const defaultTodo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  };

  const [visibleTodos, setVisibleTodos] = useState([defaultTodo]);
  const [selectedTodo, setSelectedTodo] = useState(defaultTodo);
  const [isModalVisible, setModalVisability] = useState(false);
  const [value, setSelectValue] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setVisibleTodos);
  }, []);

  const filteredTodos = visibleTodos.filter(todo => {
    switch (value) {
      case 'all':
        return todo;
      case 'completed':
        return todo.completed === true;
      case 'active':
        return todo.completed === false;
      default:
        return todo;
    }
  });

  const searchedTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));

  const handleClick = async (isClicked: boolean, todo: Todo) => {
    setModalVisability(isClicked);
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={setSelectValue}
                onSearch={setQuery}
                selectValue={value}
                query={query}
              />
            </div>

            <div className="block">
              {visibleTodos[0] === defaultTodo
                ? <Loader />
                : (
                  <TodoList
                    todos={searchedTodos}
                    onClick={handleClick}
                    selectedTodoId={selectedTodo.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <TodoModal
          todo={selectedTodo}
          onClick={handleClick}
          defaultTodo={defaultTodo}
        />
      )}
    </>
  );
};
