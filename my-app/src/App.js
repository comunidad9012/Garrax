import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimerComponente } from './components/PrimerComponente';
import { Recepcion } from './components/Recepcion';
import { Inicio } from './components/Inicio';
import { Habitaciones } from './components/Habitaciones';
import { Login } from './components/Login';
import { Pisos } from './components/Pisos';
import { Cliente } from './components/Clientes';



function App() {
  return (
    <Router>
      <div className="app-container"> {/* Contenedor principal */}
        <PrimerComponente /> {/* Menú lateral */}
        
        <div className="main-content"> {/* Contenido principal */}
          <Routes>
            <Route path= "/" element={<Login/>} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/recepcion" element={<Recepcion />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/pisos" element={<Pisos/>}/>
            <Route path="/clientes" element={<Cliente/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

