import React, { useState } from 'react';
import './App.css';

import { getTodos, getUsers, Todos } from './api/api';

import TodoList from './components/TodoList';


const getVisibleTodos = (todos: Todos[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'userName':
      return [...todos].sort((a, b) => {
        return a.user && b.user
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    default:
      return todos;
  }
}

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todos[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadClick = async () => {
    setIsLoading(true);

    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
  }

  const visibleTodos = getVisibleTodos(todos, sortType);

  if (todos.length === 0) {
    return (
      <>
        <h1>Dynamic list of todos</h1>
        <button
          onClick={handleLoadClick}
          type="button"
          className="buttonload"
        >
          <i className={isLoading ? "fa fa-spinner fa-spin" : ""}>
          </i>
          {isLoading ? 'Loading' : 'Load'}
        </button>
      </>
    )
  }

  return (
    <>
      <h1>Dynamic list of todos</h1>
      <button
        type="button"
        onClick={() => setSortType('title')}
        className="sort-button left"
      >
        Sort by title
      </button>

      <button
        type="button"
        onClick={() => setSortType('id')}
        className="sort-button"
      >
        Sort by id
      </button>

      <button
        type="button"
        onClick={() => setSortType('userName')}
        className="sort-button"
      >
        Sort by user
      </button>

      <TodoList todoList={visibleTodos} />
    </>

  );
}

export default App;        /**/
/*
Що таке React і в чому полягають його переваги?
Зачем нужен JSX? Можно ли писать на Реакте без JSX?
В чём разница между компонентом и JSX элементом?
В чём разница между функциональным и клас-компонентом?
Результат яких типів може повертати метод render (або компонент-функція)?
Що таке props? Як їх прочитати або поміняти?
Для чого потрібні PropTypes?
Що таке state? Як його прочитати або поміняти?
Як зберігати стан в функціональному компоненті?
Что такое имутабельность? Почему это важно?
Навіщо потрібен Functional setState
Що таке Virtual DOM?
Які є методи життєвого циклу React-компонента?
Когда и зачем нужен key? Каким он должен быть и почему?
Що таке React.Fragment і в яких випадках ними варто користуватися?
Як можна навісити обробник події на JSX-елемент? Чи можна навішувати події на компоненти?
Що таке контрольовані компоненти?
В каком случае нельзя сделать input контролируемым? (file)
Чем отличается поведение select в React от JS?
*/
