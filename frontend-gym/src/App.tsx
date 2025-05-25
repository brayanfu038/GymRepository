import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardA from './Components/DashboardA';
import Membresias from './Components/Pages/Membresias';

const datosEjemplo = [
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  // ... más datos
  // ... más datos
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardA />} />
        <Route
          path="/membresias"
          element={
            <Membresias
              totalMiembros={datosEjemplo.length}
              membresiasActivas={datosEjemplo.filter(dato => dato.estado).length}
              datos={datosEjemplo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
