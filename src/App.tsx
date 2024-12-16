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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]); // Для відфільтрованих завдань
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('all'); // Фільтр статусу
  const [searchTerm, setSearchTerm] = useState<string>(''); // Текст пошуку

  // Завантаження списку завдань
  const getTodoData = () => {
    setIsLoading(true);
    getTodos()
      .then(todosArray => {
        setTodos(todosArray);
        setFilteredTodos(todosArray); // Ініціалізуємо відфільтровані завдання
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(getTodoData, []);

  // Фільтрація завдань
  useEffect(() => {
    const filtered = todos.filter(todo => {
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && !todo.completed) ||
        (filterStatus === 'completed' && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    setFilteredTodos(filtered);
  }, [todos, filterStatus, searchTerm]);

  // Обробники для фільтра
  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const onOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                searchTerm={searchTerm}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  selectedItem={selectedTodo}
                  todos={filteredTodos} // Відфільтровані завдання
                  onTodoClick={onOpenModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onIconClick={onCloseModal} />
      )}
    </>
  );
};
