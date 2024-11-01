import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoCom } from './components/SegundoCom';
import { Recepcion } from './components/Recepcion';
import { Inicio } from './components/Inicio';
import { Habitaciones } from './components/Habitaciones';
import RegistroCliente from './components/RegistroCliente';
import ListaClientes from './components/ListaClientes';



function App() {
  return (
    <Router>
      <div className="app-container"> {/* Contenedor principal */}
        <PrimerComponente /> {/* Menú lateral */}
        
        <div className="main-content"> {/* Contenido principal */}
          <h1>Sistema de Gestión de Hotel</h1>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/recepcion" element={<Recepcion />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/registro" element={<RegistroCliente />} /> {/* Solo en esta ruta se mostrará el formulario */}
            <Route path="/clientes" element={<ListaClientes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

