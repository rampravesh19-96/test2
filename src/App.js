import React from 'react';
import { Route, Routes } from 'react-router-dom';
import View from './View';
import Dashboard3 from './Dashboard';

function App() {

  return (
    <div className='container'>
      <Routes>
        <Route path='/dashboard' element={<Dashboard3/>}/>
        <Route path='/dashboard/:id' element={<View/>}/>
      </Routes>
    </div>
  );
}

export default App;