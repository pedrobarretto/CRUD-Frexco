import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Create from './Create';
import Product from './Products';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Product} />
      <Route exact path="/create" component={Create} />
    </div>
  );
}

export default App;
