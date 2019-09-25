// import React from 'react';
// import './App.css';
// // import PhoneList from './PhoneList';
// import { getPhones } from './api';

// // import todos from './api/todos';
// // import users from './api/users';

// const PhoneList = ({ list }) => list.map(phone => <p>{phone.name}</p>);

// class App extends React.Component {
//   state = {
//     phones: [
//       // { id: 1, name: 'Apple iPhone X' },
//       // { id: 2, name: 'Google Pixel 3a' },
//       // { id: 3, name: 'Samsung Galaxy s10' },
//     ],
//   }

//   loadPhones = () => {
//     getPhones()
//       .then((phones) => {
//         this.setState({ phones });
//       });
//   };

//   render() {
//     const { phones } = this.state;

//     if (phones.length === 0) {
//       return <>
//         <p>No phones yet</p>
//         <button onClick="loadPhones">Load</button>
//       </>;
//     }

//     return (
//       <div className="App">
//         <h1>Dynamic list of todos</h1>
//         <PhoneList list={phones} />
//       </div>
//     );
//   }
// }

// export default App;
