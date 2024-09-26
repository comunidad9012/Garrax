import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoCom } from './components/SegundoCom';
import { Recepcion } from './components/Recepcion';
import { Inicio } from './components/Inicio';

function App() {
  return (
    <Router>
      <div>
        <PrimerComponente/> {/* Menú lateral */}
        <SegundoCom/>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recepcion" element={<Recepcion />} />
          {/* Aquí puedes añadir más rutas si es necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
