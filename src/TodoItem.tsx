import React from 'react';

type TodoItemProps = {
  todo: PreparedTodo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <div className={todo.completed
        ? 'user__completed-true'
        : 'user__completed-false'}
      >
        <div className="user">
          <span className="user__id">{todo.id}</span>
          <p className="user__name">
            Name:
            {' '}
            {todo.user.name}
          </p>
          <p className="user__title">
            Title:
            {' '}
            {todo.title}
          </p>
          <p className="user__status">
            Status:
            {' '}
            {todo.completed ? 'completed' : 'in procces'}
          </p>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
