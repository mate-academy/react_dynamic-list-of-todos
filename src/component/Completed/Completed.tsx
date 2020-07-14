import React from 'react';
import './Completed.css';

interface Props {
  isCompleted: boolean;
}
export function Completed(props: Props) {
  const { isCompleted } = props;

  if (isCompleted === true) {
    return (
      <span className="done">
        Completed
      </span>
    );
  }

  return (
    <span className="not-done">
      Uncompleted
    </span>
  );
}
