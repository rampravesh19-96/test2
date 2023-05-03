import React from 'react';
import { Route, Routes } from 'react-router-dom';
import View from './View';
import Dashboard3 from './Dashboard';

function App(props) {

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Dashboard3/>}/>
        <Route path=':id' element={<View/>}/>
      </Routes>
    </div>
  );
}

export default App;