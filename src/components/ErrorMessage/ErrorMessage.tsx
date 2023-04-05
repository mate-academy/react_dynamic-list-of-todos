import React from 'react';

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = React.memo(({ message }) => (
  <article className="message is-danger">
    <div className="message-body">
      {message}
    </div>
  </article>
));
