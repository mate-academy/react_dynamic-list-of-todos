import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [
    selectedTodoId,
    setSelectedTodoId,
  ] = useState(0);

  const [
    todos,
    setTodos] = useState([{
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  }]);

  const [
    todosRandomized,
    setTodosRandomized,
  ] = useState([...todos]);

  const [
    visibleTodos,
    setVisibleTodos,
  ] = useState([...todosRandomized]);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('');

  const [
    status,
    setStatus,
  ] = useState('all');

  const userSelection = (userId: number, id: number) => {
    setSelectedUserId(userId);
    setSelectedTodoId(id);
  };

  const clearUser = () => {
    setSelectedUserId(0);
    setSelectedTodoId(0);
  };

  const updateSearchQuery = (query: string) => {
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  };

  const updateStatus = (todoStatus: string) => {
    setStatus(todoStatus);
  };

  const randomizeTodos = () => {
    const randomizedTodos = [];
    const helperArray = [...todos];

    while (helperArray.length > 0) {
      const currentTodoIndex
        = Math.round(Math.random() * (helperArray.length - 1));
      const currentTodo = helperArray.splice(currentTodoIndex, 1);

      randomizedTodos.push(currentTodo[0]);
    }

    setTodosRandomized(randomizedTodos);
  };

  const filterByStatus = (receivedStatus: string) => {
    switch (receivedStatus) {
      case 'active':
        return todosRandomized.filter(todo => todo.completed === false);
      case 'completed':
        return todosRandomized.filter(todo => todo.completed === true);
      default:
        return todosRandomized;
    }
  };

  const filterByQuery = (todosArr: Todo[], query: string) => {
    if (!query) {
      return [...todosArr];
    }

    return todosArr.filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));
  };

  useEffect(() => {
    setVisibleTodos(filterByQuery(filterByStatus(status), searchQuery));
  }, [status, searchQuery, todosRandomized]);

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
      setVisibleTodos([...result]);
      setTodosRandomized([...result]);
    });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          userSelected={userSelection}
          filterTodosList={updateSearchQuery}
          filterTodosByStatus={updateStatus}
          randomizeTodosList={randomizeTodos}
          displayedTodos={visibleTodos}
          currentTodoId={selectedTodoId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clear={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
