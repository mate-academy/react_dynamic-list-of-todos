import React from 'react';

export const CurrentUser: React.FC = () => (
  <article className="message">
    <div className="message-header">
      <p>Selected user: 1</p>
      <button type="button" className="delete" aria-label="delete" />
    </div>
    <div className="message-body">
      <h3 data-cy="userName">
        Mrs. Dennis Schulist
      </h3>

      <p>Karley_Dach@jasper.info</p>
      <p>1-477-935-8478 x6430</p>
    </div>
  </article>
);
