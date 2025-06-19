import React from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoModal = ({
  todo,
  onClose,
}: {
  todo: Todo;
  onClose: () => void;
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '30%',
        backgroundColor: 'white',
        border: '2px solid black',
        padding: '20px',
        zIndex: 1000,
      }}
    >
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? 'Completed' : 'Active'}</p>
      <p>User ID: {todo.userId}</p>
      <button onClick={onClose}>x</button>
    </div>
  );
};
