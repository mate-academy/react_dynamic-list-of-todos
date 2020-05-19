import React from 'react';
import TodoItem from './TodoItem';

type Props = {
  todos: Todos[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <ul className="todo__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </>

  );
};

export default TodoList;
