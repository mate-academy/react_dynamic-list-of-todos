/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export type ModalData = Omit<Todo, 'userId'> & { user: User };
export type Filter = { search: string; select: string };
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [isLoading, setIsloading] = useState(false);
  const [filters, setFilters] = useState<Filter>({ search: '', select: '' });
  const [selectedTodo, setSelectedTodo] = useState<{
    userId: Todo['userId'];
    id: Todo['id'];
  } | null>(null);

  const [modalData, setModalData] = useState<ModalData | null>(null);

  useEffect(() => {
    setIsloading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsloading(false));
  }, []);

  useEffect(() => {
    const filtered = todos.filter(todo => {
      const { title, completed } = todo;
      const { search, select } = filters;

      const matchesSearch = search
        ? title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        : true;
      const matchesSelect =
        select === 'active'
          ? !completed
          : select === 'completed'
            ? completed
            : true;

      return matchesSearch && matchesSelect;
    });

    setTodoList(filtered);
  }, [filters, todos]);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    const { userId, ...rest } = todos.find(
      ({ id }) => id === selectedTodo.id,
    ) as Todo;

    setIsloading(true);
    getUser(selectedTodo.userId)
      .then(d => setModalData({ ...rest, user: d }))
      .finally(() => setIsloading(false));
  }, [selectedTodo, selectedTodo?.userId, todos]);

  const handleUserClick = ({ id, userId }: Pick<Todo, 'id' | 'userId'>) => {
    setSelectedTodo({ userId, id });
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilters={setFilters} />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : null}

              {!isLoading && todos.length ? (
                <TodoList
                  todoList={todoList}
                  onIconClick={handleUserClick}
                  selectedId={selectedTodo?.id}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo ? (
        <TodoModal
          data={modalData}
          isLoading={isLoading}
          onClose={handleModalClose}
        />
      ) : null}
    </>
  );
};
