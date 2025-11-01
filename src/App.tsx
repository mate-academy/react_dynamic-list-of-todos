/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Categories } from './types/Categories';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [qwery, setQwery] = useState('');
  const [category, setCategory] = useState(Categories.All);

  useEffect(() => {
    setLoader(true);

    const loadData = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        throw new Error('Error was occured');
      } finally {
        setLoader(false);
      }
    };

    loadData();
  }, []);

  const getVisibleTodos = (
    todosToProcess: Todo[] | null,
    categoryValue: string,
    searchValue: string,
  ): Todo[] => {
    if (todosToProcess === null) {
      return [];
    }

    let todosToProcessCopy = [...todosToProcess];

    if (categoryValue) {
      todosToProcessCopy = todosToProcessCopy.filter(todo => {
        switch (categoryValue) {
          case 'all':
            return true;
          case 'active':
            return todo.completed === false;

          case 'completed':
            return todo.completed === true;

          default:
            return;
        }
      });
    }

    if (searchValue) {
      todosToProcessCopy = todosToProcessCopy.filter(todo =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
      );
    }

    return todosToProcessCopy;
  };

  const handleChangeSelectedTodo = (choosenTodo: Todo) => {
    setSelectedTodo(choosenTodo);
  };

  const handleChooseCategory = (selectedCategory: Categories) => {
    setCategory(selectedCategory);
  };

  const handleSearch = (searchValue: string) => {
    setQwery(searchValue);
  };

  const handleResetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleClearSearch = () => {
    setQwery('');
    // setCategory(Categories.all);
  };

  const preparedTodos = getVisibleTodos(todos, category, qwery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                valueCategory={category}
                valueQwery={qwery}
                onCategory={handleChooseCategory}
                onQwery={handleSearch}
                onClear={handleClearSearch}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  onChangeTodo={handleChangeSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseButton={handleResetSelectedTodo}
        />
      )}
    </>
  );
};
