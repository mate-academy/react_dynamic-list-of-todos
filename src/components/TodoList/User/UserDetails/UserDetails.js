import React from 'react';
import './UserDetails.css';

export default function UserDetails(props) {
  const { website, phone, companyName } = props;

  return (
    <div className="info-details">
      <ul>
        <li>
          User website: <a href={website}>
          {website}
        </a>
        </li>
        <li>Phone: {phone}</li>
        <li>Company: "{companyName}"</li>
      </ul>
    </div>
  );
}
