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
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [quary, setQuary] = useState('');
  const [filter, setFilter] = useState('');

  const filterList = (list: Todo[]) => {
    let todoList = list.filter(todoItem => todoItem.title.includes(quary));

    switch (filter) {
      case 'all': break;
      case 'completed': todoList = todoList.filter(todoItem => todoItem.completed); break;
      case 'active': todoList = todoList.filter(todoItem => !todoItem.completed); break;
      default: break;
    }

    return todoList;
  };

  const toogleModal = () => {
    setModalVisible(prevstate => !prevstate);
  };

  useEffect(() => {
    getTodos().then(response => {
      setTodos(response);
      setIsLoading(false);
    });
  }, []);

  const preparedGoods = filterList(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={setFilter}
                filter={filter}
                quary={quary}
                setQuary={setQuary}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader />
                : (
                  <TodoList
                    todos={preparedGoods}
                    onTodoSelected={setSelectedTodo}
                    toogleModal={toogleModal}
                    isModalVisible={isModalVisible}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && <TodoModal todo={selectedTodo} toogleModal={toogleModal} />}
    </>
  );
};
