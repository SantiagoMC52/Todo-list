import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import InputTask from './components/InputTask';
import store from './redux/store/index';

function App() {
  return (
    <Provider store={store()}>
      <div className="main">
        <header className="header">
          <h1>TO DO LIST</h1>
        </header>
        <InputTask />
      </div>
    </Provider>
  );
}

export default App;
