import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoCom } from './components/SegundoCom';
import { Recepcion } from './components/Recepcion';
import { Inicio } from './components/Inicio';
import { Habitaciones } from './components/Habitaciones';
import Login from './components/Login';
import Registro from './components/Registro';




function App() {
  return (
    <Router>
      <div className="app-container"> {/* Contenedor principal */}
        <PrimerComponente /> {/* Menú lateral */}
        
        <div className="main-content"> {/* Contenido principal */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/recepcion" element={<Recepcion />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registro" element={<Registro/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

