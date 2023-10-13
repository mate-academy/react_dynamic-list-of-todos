import React, { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import {
  todoContext,
  DefaultValueType,
} from '../../Contexts/Context';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const {
    visibleItems,
    getFilteredItemsByCondition,
  } = useContext(todoContext) as DefaultValueType;

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
          visibleItems && getFilteredItemsByCondition(visibleItems)
            .map(todo => {
              return <TodoItem todo={todo} key={todo.id} />;
            })
        }
      </tbody>
    </table>
  );
};
