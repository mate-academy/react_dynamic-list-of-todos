import React from 'react';
import TodoCard from './TodoCard';

type Props = {
  todos: ApdateTodo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <tr key={todo.id} className="todo">
          <TodoCard todo={todo} />
        </tr>
      ))}
    </>
  );
};

export default TodoList;
