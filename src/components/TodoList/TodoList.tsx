import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type TodoListProps = {
  todos: Todo[];
  todoId?: number;
  onOpenModal: (selectedTodo: Todo) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  todoId,
  onOpenModal,
}) => (
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
      {todos.map((todo) => {
        const isTodoModalOpen = todoId === todo.id;

        return (
          <>
            <TodoItem
              key={todo.id}
              todo={todo}
              isTodoModalOpen={isTodoModalOpen}
              onOpenModal={onOpenModal}
            />
          </>
        );
      })}
    </tbody>
  </table>
);
