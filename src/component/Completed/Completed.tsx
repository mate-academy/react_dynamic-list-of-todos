import React from 'react';
import './Completed.css';

interface Props {
  isCompleted: boolean;
}
export function Completed(props: Props) {
  const { isCompleted } = props;

  if (isCompleted === true) {
    return (
      <p className="done">
        Completed
      </p>
    );
  }

  return (
    <p className="not-done">
      Uncompleted
    </p>
  );
}
