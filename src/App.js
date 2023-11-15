import React from 'react';
import './App.css';
import ImgSection from './components/ImgSection/ImgSection';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="container">
      {/* Sección de la izquierda */}
      <div className="left-section">
        <NavBar />
        <Form />
      </div>

      {/* Sección de la derecha */}
      <div className="right-section">
        <ImgSection />
      </div>
    </div>
  );
}
export default App;