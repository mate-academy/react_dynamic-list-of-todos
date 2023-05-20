/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [todoModal, setTodoModal] = useState<Todo | null>(null);
  const [selectCompleted, setSelectCompleted] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadGoods = async () => {
      const goodsData = await getTodos();

      setTodos(goodsData);
    };

    loadGoods();
  }, [todos]);

  const openModal = (todo: Todo) => {
    setTodoModal(todo);
  };

  const resetTodoModal = (reset: null) => {
    setTodoModal(reset);
  };

  const handleSelect = (e: string) => {
    setSelectCompleted(e);
  };

  const searchQuery = (word: string) => {
    setQuery(word);
  };

  const filteredTodos = useMemo(() => {
    let newTodo = todos;

    if (selectCompleted === 'active') {
      newTodo = newTodo.filter(todo => !todo.completed);
    }

    if (selectCompleted === 'completed') {
      newTodo = newTodo.filter(todo => Boolean(todo.completed));
    }

    const queryTrimed = query.trim()
      .split(' ').filter(Boolean).join(' ')
      .toLowerCase();

    if (query) {
      newTodo = newTodo.filter(todo => todo.title.toLowerCase().includes(queryTrimed));
    }

    return newTodo;
  }, [todos, selectCompleted, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelect={handleSelect}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={filteredTodos}
                openModal={openModal}
                reset={todoModal}
              />
            </div>
          </div>
        </div>
      </div>
      {todoModal !== null && <TodoModal todoModal={todoModal} resetTodoModal={resetTodoModal} />}
    </>
  );
};
