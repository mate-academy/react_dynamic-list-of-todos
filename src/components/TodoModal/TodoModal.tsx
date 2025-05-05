import React from 'react';
import { Todo } from '../api/types';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => (
  <div>
    <h2>{todo.title}</h2>
    <p>Assigned to: {todo.user?.name}</p>
    <p>Email: {todo.user?.email}</p>
    <button onClick={onClose}>x</button>
  </div>
);

export default TodoModal;
