import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardA from './Components/DashboardA';
import Membresias from './Components/Pages/Membresias';
import DashboardUsuarios from './Components/Pages/DashboardUsuarios';
import DashboardInventario from './Components/Pages/DashboardInventario';

const datosEjemplo = [
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },

  // ... más datos
  // ... más datos
];
const datosUsuarios = [
  { documento: '12345678', nombre: 'Juan Pérez', rol: 'Premium', contrasenia: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', rol: 'Básica', contrasenia: '2024-12-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', rol: 'Básica', contrasenia: '2024-12-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', rol: 'Básica', contrasenia: '2024-12-01',estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', rol: 'Premium', contrasenia: '2025-01-01',estado:true},

  // ... más datos
  // ... más datos
];

const datosInventario = [
  { idProducto: '12345678', nombre: 'Juan Pérez', tipoProducto: 'suplemento', precio: '2025-01-01',estado:true },
  { idProducto: '87654321', nombre: 'Ana Gómez', tipoProducto: 'Accesorio', precio: '2024-12-01',estado:true },
  { idProducto: '87654321', nombre: 'Ana Gómez', tipoProducto: 'suplemento', precio: '2024-12-01',estado:true },
  { idProducto: '87654321', nombre: 'Ana Gómez', tipoProducto: 'Accesorio', precio: '2024-12-01',estado:true },
  { idProducto: '12345678', nombre: 'Juan Pérez', tipoProducto: 'Accesorio', precio: '2025-01-01',estado:true},

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
         <Route
          path="/Usuarios"
          element={
            <DashboardUsuarios
              totalUsuarios={datosUsuarios.length}
              UsuariosActivos={datosUsuarios.filter(dato => dato.estado).length}
              datos={datosUsuarios}
            />
          }
        />
         <Route
          path="/Inventario"
          element={
            <DashboardInventario
            totalSuplementos={datosInventario.filter(dato => dato.tipoProducto.toLowerCase()==="Suplemento".toLowerCase()).length}
            totalAccesorios={datosInventario.filter(dato => dato.tipoProducto.toLowerCase()==="Accesorio".toLowerCase()).length}
              datos={datosInventario}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
