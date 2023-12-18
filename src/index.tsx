import ReactDOM from 'react-dom';
import { App } from './App';
import MyContextProvider from './context/myContext';

ReactDOM.render(
  <MyContextProvider>
    <App />
  </MyContextProvider>,

  document.getElementById('root'),
);
