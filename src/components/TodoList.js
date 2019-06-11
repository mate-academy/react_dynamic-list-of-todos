import TodoItem from './TodoItem';
import React from 'react'

export default function TodoList(props) {
  const usersMap = props.users.reduce(
    (acc, user) => ({ ...acc, [user.id]: user }),
    {}
  );
  const todosWithUsers = props.todos.map(todo => ({
    ...todo,
    user: usersMap[todo.userId]
  }));

  const todoItems = todosWithUsers.map(todo => {
    return (
      <TodoItem
        title={todo.title}
        completed={todo.completed}
        key={todo.id}
        userInfo={todo.user}
      />
    );
  });
  return todoItems;
}

