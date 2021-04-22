import React, { useState } from 'react';

// add prop types to UserForm
export const UserForm = React.memo(({ positions, addUserToServer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [position, setPosition] = useState(0);

  const handleChange = (event, callback) => {
    const { value } = event.target;

    callback(value);
  };

  const handlePhoto = (event) => {
    const file = event.target.files[0];

    setPhoto(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('position_id', String(position));
    data.append('phone', phone);
    data.append('photo', photo);

    addUserToServer(data);

    setName('');
    setEmail('');
    setPhoto('');
    setPhone('');
    setPosition(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="name"
        value={name}
        onChange={e => handleChange(e, setName)}
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => handleChange(e, setEmail)}
        required
      />
      <input
        type="phone"
        value={phone}
        onChange={e => handleChange(e, setPhone)}
        required
      />
      <select
        name="positions"
        value={position}
        onChange={e => handleChange(e, setPosition)}
      >
        {positions.map(item => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        onChange={handlePhoto}
        required
      />

      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
});
