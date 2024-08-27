import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [modalActive, setModalActive] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleBuuton={handleOpenModal}
              modalActive={modalActive}
              selectedTodo={selectedTodo}
            />
          ))}
        </tbody>
      </table>

      {modalActive && selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
