/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('all');
  const [isShowing, setIsShowing] = useState(false);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);
  const [chosenUser, setChosenUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const onClick = () => {
    setValue('');
  };

  const showModal = async (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    setTodoId(id);
    setChosenTodo(todo);
    setChosenUser(null);
    setModalLoading(true);
    setIsShowing(true);

    const user = await getUser(todo.userId);

    setChosenUser(user);
    setModalLoading(false);
  };

  const closeModal = () => {
    setIsShowing(false);
    setTodoId(null);
    setChosenTodo(null);
    setChosenUser(null);
  };

  const filteredTodos = todos
    .filter(todo => {
      return todo.title.toLowerCase().includes(value.toLowerCase());
    })
    .filter(todo => {
      if (selected === 'all') {
        return true;
      }

      if (selected === 'active') {
        return !todo.completed;
      }

      if (selected === 'completed') {
        return todo.completed;
      }

      return true;
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={value}
                onChange={handleChange}
                selected={selected}
                onSelectChange={onSelectChange}
                onClick={onClick}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                showModal={showModal}
                selectedTodoId={todoId}
              />
            </div>
          </div>
        </div>
      </div>

      {isShowing && chosenTodo && (
        <TodoModal
          todo={chosenTodo}
          user={chosenUser}
          loading={modalLoading}
          onClose={closeModal}
        />
      )}
    </>
  );
};
