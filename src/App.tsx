/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [selected, setSelected] = useState('all');
  const [searched, setSearched] = useState('');
  const isActiveModal = selectedTodo && isTodoModalOpen;
  const [activeTodo, setActiveTodo] = useState(selectedTodo?.id || -1);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const changeState = (field: string, newValue: string) => {
    if (field === 'select' || field === 'input') {
      setSelected(newValue);
      setSearched(newValue);
    }
  };

  const todoFiltered = (status: string, words: string) => {
    if (selected === 'all' && !searched) {
      return todos;
    }

    return todos.filter((todo) => {
      switch (status) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
        default:
          return todo;
      }
    })
      .filter((todo) => todo.title.toLowerCase().includes(words.toLowerCase()));
  };

  const choosingUser = (todoUser: Todo) => {
    setSelectedTodo(todoUser);
    setActiveTodo(todoUser.id);
    setIsTodoModalOpen(true);
  };

  const changeModalVisibility = (switcher: boolean) => {
    setIsTodoModalOpen(switcher);
    setActiveTodo(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeState={changeState}
                selected={selected}
                searched={searched}
              />
            </div>

            <div className="block">
              {(todos.length > 0)
                ? (
                  <TodoList
                    todos={todoFiltered(selected, searched)}
                    choosingUser={choosingUser}
                    choosingRow={activeTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isActiveModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          removeModal={changeModalVisibility}
        />
      )}
    </>
  );
};
