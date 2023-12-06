import React, { useContext } from 'react';
import { StateContext } from '../Provider/Context';
import { TodoItem } from '../TodoItem';
import { Filter } from '../../types/Filter';

const normalizeData = (str: string) => str.trim().toLowerCase();

export const TodoList: React.FC = () => {
  const { todos, filterBy, filterByQuery } = useContext(StateContext);

  const filteredTodos = todos
    .filter(todo => todo
      .title.toLowerCase()
      .includes(normalizeData(filterByQuery)))
    .filter(todo => {
      switch (filterBy) {
        case Filter.ACTIVE:
          return !todo.completed;

        case Filter.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {
          filteredTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        }
      </tbody>
    </table>
  );
};
