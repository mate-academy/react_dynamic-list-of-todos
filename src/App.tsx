/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedModal, setSeletedModal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
      .then(response => response.json())
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search.length === 0 && selectedFilter.length === 0) {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter(todo => {
        const titleMatch = todo.title.toLowerCase().includes(search.toLowerCase());
        let filterMatch = false;

        switch (selectedFilter) {
          case '':
            filterMatch = true;
            break;
          case 'active':
            filterMatch = !todo.completed;
            break;
          case 'completed':
            filterMatch = todo.completed;
            break;
          case 'all':
            filterMatch = true;
            break;
          default: filterMatch = false;
        }

        return titleMatch && filterMatch;
      }));
    }
  }, [search, selectedFilter]);

  const showModal = (todo: Todo) => {
    setIsModalOpen(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSeletedModal(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(value);
  };

  const handleSearchClear = () => {
    setSearch('');
  };

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;

    setSelectedFilter(option);
  };

  const handleHide = (id: number) => {
    setSeletedModal(id);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={handleSelectFilter}
                search={handleSearch}
                value={search}
                clearSearch={handleSearchClear}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                showModal={showModal}
                handleHide={handleHide}
                selectedModal={selectedModal}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <TodoModal todo={selectedTodo} closeModal={closeModal} />}
    </>
  );
};
