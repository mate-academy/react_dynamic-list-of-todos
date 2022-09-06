/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodo, setVisibleTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsloaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoStatusSelect, setTodoStatusSelect] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
    setIsloaded(true);
  }, []);

  const filterTodosByStatus = (status: string): Todo[] => {
    switch (status) {
      case 'active':
        return todos.filter(todo => todo.completed === false);

      case 'completed':
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  };

  const preparedTodos = searchQuery !== ''
    ? todos.filter(todo => (
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    : filterTodosByStatus(todoStatusSelect);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoStatusSelect={todoStatusSelect}
                searchQuery={searchQuery}
                onStatusSelect={(status) => setTodoStatusSelect(status)}
                onInputChange={(query) => setSearchQuery(query)}
              />
            </div>

            <div className="block">
              {isLoaded && todos.length > 0
                ? (
                  <TodoList
                    todos={preparedTodos}
                    currentTodo={visibleTodo}
                    isModalVisible={isModalVisible}
                    onModalBtn={(currentTodo: Todo | null) => {
                      setIsModalVisible(true);
                      setVisibleTodo(currentTodo);
                    }}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {(isModalVisible && visibleTodo !== null)
         && (
           <TodoModal
             todo={visibleTodo}
             onCloseBtn={() => {
               setIsModalVisible(false);
             }}
           />
         )}
    </>
  );
};
