// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recepcion from './componentes/recepcion'; // Componente Recepcion importado correctamente
import BaseLayout from './componentes/BaseLayout'; // Componente BaseLayout
import Home from './componentes/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recepcion" element={<Recepcion />} /> {/* Uso correcto de la mayúscula */}
      </Routes>
    </Router>
  );
}

export default App;

