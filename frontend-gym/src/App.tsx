import { BrowserRouter, Route, Routes } from 'react-router-dom';


//import DashboardA from './Components/Pages/administrator/DashboardA';
//import Membresias from './Components/Pages/membresias/Membresias';
import DashboardUsuarios from './Components/Pages/users/DashboardUsuarios';
import DashboardInventario from './Components/Pages/inventario/DashboardInventario';
import LoginForm from './Components/Pages/login/LoginForm';
import DashboardS from './Components/Pages/users/DashboardS';
import CrearProducto from './Components/Pages/inventario/CrearProducto';
import ModificarProducto from './Components/Pages/inventario/ModificarProducto';
import DashboardFinanzas from './Components/Pages/finanzas/DasboardFinanzas';
import CrearTransaccion from './Components/Pages/finanzas/CrearTransaccion';
import ModificarTransaccion from './Components/Pages/finanzas/ModificarTranzacion';
import GenerarReporte from './Components/Pages/finanzas/GenerarReporte';
import EditarUsuario from './Components/Pages/users/EditarUsuario';
import DashboardRutinas from "./Components/Pages/sesiones/DashboardRutinas";
import ReporteFinanciero from './Components/Pages/finanzas/ReporteFinanciero';
import ModalExportar from './Components/generals/ModalExportar';
import Anamnesis from './Components/Pages/membresias/Anamnesis';
import CrearEjercicio from './Components/Pages/membresias/CrearEjercicio';
import PlanEntrenamiento from './Components/Pages/membresias/PlanEntrenamiento';
import NuevoEjercicio from './Components/Pages/sesiones/NuevoEjercicio';
import ResumenRutina from './Components/Pages/sesiones/ResumenRutina';
import CrearUsuario from './Components/Pages/users/CrearUsuario';
import Membresias from './Components/Pages/membresias/Membresias';
import NuevaMembresia from './Components/Pages/users/NuevaMembresia';

const datosEjemplo = [
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01', estado: true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01', estado: true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01', estado: true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01', estado: true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01', estado: true },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: false },
  { documento: '87654321', nombre: 'Ana Gómez', tipo: 'Básica', vencimiento: '2024-12-01', estado: true },
  { documento: '12345678', nombre: 'Juan Pérez', tipo: 'Premium', vencimiento: '2025-01-01', estado: false },
];

const transaccionesEjemplo = [
  {
    idTransaccion: 'TXN-1001',
    titular: 'Juan Pérez',
    tipoTransaccion: 'Entrada',
    valor: '1500.00',
    descripcion: 'Pago recibido por venta de producto',
  },
  {
    idTransaccion: 'TXN-1002',
    titular: 'Empresa XYZ',
    tipoTransaccion: 'Salida',
    valor: '500.00',
    descripcion: 'Pago de servicios de mantenimiento',
  },
];

// Componente para proteger rutas



/*const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/login" />;
};
*/
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <DashboardS />
            //</ProtectedRoute>
          }
        />
        <Route

          path="/membresias"
          element={
            //<ProtectedRoute>
            <Membresias
              totalMiembros={datosEjemplo.length}
              membresiasActivas={datosEjemplo.filter(d => d.estado).length}
              datos={datosEjemplo}
            />
            // </ProtectedRoute>
          }

        />

        <Route
          path="/NuevaMembresia"
          element={
            //<ProtectedRoute>
            <NuevaMembresia
            />
            // </ProtectedRoute>
          }
        />


        <Route
          path="/Usuarios"
          element={
            // <ProtectedRoute>
            <DashboardUsuarios

            />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/sesiones"
          element={
            // <ProtectedRoute>
            <DashboardRutinas />
            // </ProtectedRoute>
          }
        />
        <Route path="/rutinas/nuevo-ejercicio" element={<NuevoEjercicio />} />

        <Route path="/rutinas/resumen" element={<ResumenRutina />} />

        <Route
          path="/nuevoUsuario"
          element={
            // <ProtectedRoute>
            <CrearUsuario />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/editarUsuario/:id"
          element={
            // <ProtectedRoute>
            <EditarUsuario />
            //  </ProtectedRoute>
          }
        />

        <Route
          path="/inventario"
          element={
            // <ProtectedRoute>
            <DashboardInventario />
            // </ProtectedRoute>

          }
        />

        <Route
          path="/CrearProducto"
          element={
            // <ProtectedRoute>
            <CrearProducto />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/ModificarProducto"
          element={
            // <ProtectedRoute>
            <ModificarProducto />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/finanzas"
          element={
            // <ProtectedRoute>
            <DashboardFinanzas
              entradasDia={1}
              salidasDia={2}
              datos={transaccionesEjemplo} />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/CrearTransaccion"
          element={
            // <ProtectedRoute>
            <CrearTransaccion />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/ModificarTransaccion"
          element={
            // <ProtectedRoute>
            <ModificarTransaccion />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/GenerarReporte"
          element={
            // <ProtectedRoute>
            <GenerarReporte />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/ReporteFinanciero"
          element={
            // <ProtectedRoute>
            <ReporteFinanciero

            />
            //</ProtectedRoute>
          }
        />

        <Route
          path="/Anamnesis"
          element={
            // <ProtectedRoute>
            <Anamnesis

            />
            //</ProtectedRoute>
          }
        />

        <Route
          path="/FormExercise"
          element={
            // <ProtectedRoute>
            <CrearEjercicio

            />
            //</ProtectedRoute>
          }
        />

        <Route
          path="/Notificacion"
          element={
            // <ProtectedRoute>
            <ModalExportar
            />
            //</ProtectedRoute>
          }
        />

        <Route
          path="/ResultadoMembresia"
          element={
            // <ProtectedRoute>
            <PlanEntrenamiento

            />
            //</ProtectedRoute>
          }
        />

        {/* Ruta por defecto: redirigir a login si no se encuentra <Route path="*" element={<Navigate to="/login" />} />*/}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
