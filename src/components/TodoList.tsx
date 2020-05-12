import React, { useState } from 'react';
import { Todos } from '../interfaces/interfaces';
import { SortPanel } from './SortPanel';

export const TodoList: React.FC<Todos> = ({ todos }) => {
  const [sortedTodos, setTodos] = useState([...todos]);

  const [isSortedByTitle, setSortedByTitle] = useState(0);
  const [isSortedByName, setSortedByName] = useState(0);
  const [isSortedByStatus, setSortedByStatus] = useState(0);

  const handleSort = (sortType: string) => {
    if (sortType === 'title') {
      if (isSortedByTitle === 1) {
        setTodos(prev => [...prev].sort((a, b) => b.title.localeCompare(a.title)));
        setSortedByTitle(0);
      } else {
        setTodos(prev => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
        setSortedByTitle(1);
      }
    }

    if (sortType === 'status') {
      if (isSortedByStatus === 1) {
        setTodos(prev => [...prev].sort((a, b) => Number(b.completed) - Number(a.completed)));
        setSortedByStatus(0);
      } else {
        setTodos(prev => [...prev].sort((a, b) => Number(a.completed) - Number(b.completed)));
        setSortedByStatus(1);
      }
    }

    if (sortType === 'name') {
      if (isSortedByName === 1) {
        setTodos(prev => [...prev].sort((a, b) => b.user.name.localeCompare(a.user.name)));
        setSortedByName(0);
      } else {
        setTodos(prev => [...prev].sort((a, b) => a.user.name.localeCompare(b.user.name)));
        setSortedByName(1);
      }
    }
  };

  return (
    <>
      <SortPanel handleSort={handleSort} />
      <ul className="collection">
        {sortedTodos.map(({
          id, title, completed, user,
        }) => (
          <li key={id} className="collection-item avatar">
            <img
              src="https://materializecss.com/images/yuna.jpg"
              alt=""
              className="circle"
            />
            <span className="title">{user.name}</span>
            <p>{title}</p>
            <i className="secondary-content">
              {completed
                ? <i className="material-icons color-green">Completed</i>
                : <i className="material-icons color-red">In Process</i>}
            </i>
          </li>
        ))}
      </ul>
    </>
  );
};
