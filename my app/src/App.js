import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoCom } from './components/SegundoCom';
import { Recepcion } from './components/Recepcion';
import { Inicio } from './components/Inicio';
import { RegisterCliente } from './components/RegisterCliente';
import { Cliente } from './components/Cliente';

function App() {
  return (
    <Router>
      <div>
        <PrimerComponente /> {/* Menú lateral */}
        <SegundoCom />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recepcion" element={<Recepcion />} />
          <Route path="/clientes" element={<Cliente />} />  {/* Ruta corregida para Cliente */}
          <Route path="/registrar-cliente" element={<RegisterCliente />} /> {/* Ruta para el registro */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
