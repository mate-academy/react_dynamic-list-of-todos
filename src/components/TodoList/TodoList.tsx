import React from 'react';

// Define the type for Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Define the types for the props
interface TodoListProps {
  todos: Todo[];
  onShowTodoModal: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onShowTodoModal }) => {
  return (
    <div>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <button onClick={() => onShowTodoModal(todo)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
