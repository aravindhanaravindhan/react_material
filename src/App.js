import React from 'react'
import { BrowserRouter, Routes, Route,link } from "react-router-dom";
import About from './Component/About';
import Home from './Component/Home';
import Contact from './Component/Contact';

import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Employee from './Component/Employee';
const withMT = require("@material-tailwind/react/utils/withMT");

function App() {
  return (
    <PrimeReactProvider>
   <BrowserRouter>
   <Routes>
    <Route path='' element={<Home/>}>
    <Route path='about' element={<About/>}/> 
    <Route path='contact' element={<Contact/>}/> 
    <Route path='employee' element={<Employee/>}/> 
   </Route>
   </Routes>
   
   </BrowserRouter>
   </PrimeReactProvider>
  )
}

export default App