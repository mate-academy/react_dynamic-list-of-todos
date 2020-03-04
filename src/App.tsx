import React, {FC, useState} from 'react';
import { TodoList } from './components/TodoList';
import './App.css';
import { getTodos, getUsers } from './api/getData';       
import { Actions } from './components/Actions';

export const  App:FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  async function handleStart() {
    setIsLoaded(true);
    setIsLoading(true);
    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);
    setTodos(todosFromServer.map((todo) => (
      {
        ...todo,
        user: usersFromServer
        .find((user) => user.id === todo.userId),
      })));
    setIsLoading(false);
  }

  function sortByTitle() {    
    setTodos([...todos
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => a.title.localeCompare(b.title))]);  
  }

  function sortByUserName() {
    setTodos([...todos
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => {
          if (a.user && b.user) {
            return a.user.name.localeCompare(b.user.name)
          }
          else return 0;
      })]);  
  }

  function sortByCompleted() {
    setTodos([...todos
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => {
      const a1 = a.completed ? 1 : 0;
      const b1 = b.completed ? 1 : 0;

      return a1 - b1;
    })]);
  }
      
return (
   <>
   {isLoaded && 
    <Actions 
       sortByCompleted={sortByCompleted} 
       sortByTitle={sortByTitle} 
       sortByUserName={sortByUserName} 
    />}
   
   {!isLoaded && 
     <button 
       className="button" 
       type="button" 
       onClick={handleStart}
     >
       Press to start
    </button>}   
   {isLoading ? <p>Loading...</p> : <TodoList data={todos} />}   
   </>
  );
}
  