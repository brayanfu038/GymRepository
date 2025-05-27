import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


//import DashboardA from './Components/Pages/administrator/DashboardA';
import Membresias from './Components/Pages/membresias/Membresias';
import DashboardUsuarios from './Components/Pages/users/DashboardUsuarios';
import DashboardInventario from './Components/Pages/inventario/DashboardInventario';
import NuevoUsuario from './Components/Pages/users/NuevoUsuario';
import LoginForm from './Components/Pages/login/LoginForm';
import DashboardS from './Components/Pages/DashboardS';



// Datos ficticios
const datosEjemplo = [
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado:true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01',estado:false },

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

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/membresias"
          element={
            <ProtectedRoute>
              <Membresias
                totalMiembros={datosEjemplo.length}
                membresiasActivas={datosEjemplo.filter(d => d.estado).length}
                datos={datosEjemplo}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Usuarios"
          element={
            <ProtectedRoute>
              <DashboardUsuarios

              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Inventario"
          element={
            <ProtectedRoute>
              <DashboardInventario
                totalSuplementos={datosInventario.filter(d => d.tipoProducto.toLowerCase() === 'suplemento').length}
                totalAccesorios={datosInventario.filter(d => d.tipoProducto.toLowerCase() === 'accesorio').length}
                datos={datosInventario}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nuevoUsuario"
          element={
            <ProtectedRoute>
              <NuevoUsuario />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
