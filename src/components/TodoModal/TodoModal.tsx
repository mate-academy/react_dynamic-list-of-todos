import React from 'react';

// Define the type for Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Define the types for the props
interface TodoModalProps {
  todo: Todo;
  onClose: () => void; // onClose is a function that returns nothing (void)
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  return (
    <div>
      <div>
        <h2>{todo.title}</h2>
        <p>{todo.completed ? 'Completed' : 'Active'}</p>
        <button onClick={onClose}>x</button>
      </div>
    </div>
  );
};

export default TodoModal;
