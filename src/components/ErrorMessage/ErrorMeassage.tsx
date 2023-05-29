import React from 'react';
import 'bulma/css/bulma.css';
import './ErrorMessage.scss';

export const ErrorMeassage: React.FC = () => (
  <article className="message is-warning is-medium">
    <div className="message-header">
      <p>Warning</p>
    </div>
    <div className="message-body">
      Ups... Something go wrong, and data cannot be loaded.
      Please, try one more time
    </div>
  </article>
);
