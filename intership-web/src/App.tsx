import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Organization from './pages/Organization/Organization';
import Authorize from './pages/signIn/Authorize';
import Division from './pages/Division/Division'
import Employee from './pages/Employee/Employee';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authorize />}/>
        <Route path="/organization" element={<Organization />}/>
        <Route path="/organization/division" element={<Division /> }/>
        <Route path="/organization/division/employee" element={<Employee /> }/>
      </Routes>
    </BrowserRouter>
  );
};