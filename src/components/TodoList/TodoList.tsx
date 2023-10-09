import React, { ReactNode, memo } from 'react';

type Props = {
  children: ReactNode;
};

export const TodoList: React.FC<Props> = memo(({ children }) => (
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
      {children}
    </tbody>
  </table>
));
