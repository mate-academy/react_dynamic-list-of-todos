import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export interface SelectedTodo {
  currentTodoId: number;
  currentUserId: number;
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>({
    currentTodoId: 0,
    currentUserId: 0,
  });

  useEffect(() => {
    getTodos().then(data => {
      setTodoList(data);
      setFilteredTodoList(data);
      setIsLoading(false);
    });
  }, []);

  const handleFilterChange = useCallback((filteredTodos: Todo[]) => {
    setFilteredTodoList(filteredTodos);
  }, []);

  const toggleModal = useCallback((todoId: number, userId: number) => {
    setIsModalOpen(prev => !prev);
    setSelectedTodo(prevState => ({
      currentTodoId: prevState.currentTodoId === todoId ? 0 : todoId,
      currentUserId: prevState.currentUserId === userId ? 0 : userId,
    }));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoList={todoList}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={filteredTodoList}
                  onEyeClick={toggleModal}
                  isModalOpen={isModalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          toggleModal={toggleModal}
          todoList={todoList}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
