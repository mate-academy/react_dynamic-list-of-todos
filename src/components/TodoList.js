import React from 'react';
import TodoItem from './TodoItem';
        
function TodoList(props) {   
  const todoList = props.todos.map(currentTodo => {
  return <TodoItem key={currentTodo.id } item={currentTodo} users={props.users}/>
  });
  return (  
    <table>
      <thead>
        <tr><td>Title</td><td>Status</td><td>Author</td></tr>
      </thead>
      <tbody>
        {todoList}
      </tbody>
    </table>
  );
}

export default TodoList;
