/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getTodos } from './api';
import { Todo } from './types/Todo';

// type Filter = 'all' | 'active' | 'completed';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [originalList, setOriginalList] = useState<Todo[]>([]);
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function filterList(filterQuery: Filter, list: Todo[]): Todo[] {
    switch (filterQuery) {
      case 'all':
        return list;
      case 'active':
        return list.filter(todo => !todo.completed);
      case 'completed':
        return list.filter(todo => todo.completed);
    }
  }

  function queryList(inputQuery: string, list: Todo[]): Todo[] {
    return list.filter(item => item.title.includes(inputQuery.toLowerCase()));
  }

  // useEffect(() => { // делает запросы каждый раз
  //   setLoading(true);
  //   getTodos()
  //     .then(list => {
  //       setOriginalList(list);
  //       setTodoList(filterList(filter, list));
  //     })
  //     .finally(() => setLoading(false));
  // }, [filter]);

  // useEffect(() => { // работает с ним в паре
  //   let filteredList = originalList;
  //   if (query) {
  //     filteredList = queryList(query, originalList);
  //   }
  //   // setTodoList(queryList(query, todoList));
  //   setTodoList(filteredList);
  // }, [query, originalList]);

  useEffect(() => {
    // при изменении фильтра не срабатывает
    setLoading(true);
    getTodos()
      .then(list => {
        setOriginalList(list);
        setTodoList(filterList('all', list));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // let filteredList = originalList;
    // setTodoList(filterList(filter, filteredList));
    let filteredList = filterList(filter, originalList);

    if (query) {
      filteredList = queryList(query, originalList);
    }

    // setTodoList(queryList(query, todoList));
    setTodoList(filteredList);
  }, [query, originalList, filter]);

  // console.log(todoList);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todoList={todoList}
                setTodo={setTodoSelected}
                setUser={setSelectedUser}
                setLoading={setUserLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {todoSelected && selectedUser && (
        <TodoModal
          userLoading={userLoading}
          todo={todoSelected}
          setTodo={setTodoSelected}
          user={selectedUser}
        />
      )}
    </>
  );
};
