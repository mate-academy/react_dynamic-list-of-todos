import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const emptyTodo = {
  completed: false,
  id: 0,
  title: '',
  userId: 0,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(emptyTodo);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const handleChangeTodos = async (callback: Promise<Todo[]>) => {
    setTodos(await callback);
  };

  const showModal = (todo: React.SetStateAction<Todo>) => setSelectedTodo(todo);
  const closeModal = () => setSelectedTodo(emptyTodo);

  const getVisibleTodos = () => todos
    .filter(todo => todo.title.toLowerCase().includes(query));

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, query],
  );

  const changeQuery = (value: string) => setQuery(value.toLowerCase());

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeQuery={changeQuery}
                handleChangeTodos={handleChangeTodos}
              />
            </div>

            {!visibleTodos.length
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={showModal}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
      {selectedTodo.id
        && <TodoModal todo={selectedTodo} closeModal={closeModal} />}
    </>
  );
};
