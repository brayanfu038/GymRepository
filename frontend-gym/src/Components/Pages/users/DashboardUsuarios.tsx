import React, { useState, useEffect } from 'react';
import './DashboardUsuarios.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface DatoUsuarios {
  id: number;
  userName: string;
  email: string;
  active: boolean;
}

const DashboardUsuarios: React.FC = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [datos, setDatos] = useState<DatoUsuarios[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/users/allU', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) {
          alert(response.json())
          throw new Error(`Error al obtener usuarios: ${response.status}`);
        }

        const data = await response.json();
        setDatos(data);
        console.log('Datos de usuarios:', data);    
        alert("Datos de usuarios: " + JSON.stringify(data));    
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  const datosFiltrados = datos.filter((d) => {
    const query = busqueda.toLowerCase();
    return (
      d.userName.toLowerCase().includes(query) ||
      d.email.toLowerCase().includes(query)
    );
  });

  const totalItems = datosFiltrados.length;
  const startItem = (pagina - 1) * filasPorPagina + 1;
  const endItem = Math.min(pagina * filasPorPagina, totalItems);
  const totalPaginas = Math.ceil(totalItems / filasPorPagina);

  const mostrarDatos = datosFiltrados.slice(startItem - 1, endItem);

  useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  const totalUsuarios = datos.length;
  const UsuariosActivos = datos.filter(d => d.active).length;

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          <div className="fila encabezado">
            <div className="titulo-usuarios">
              <FaCalendarAlt size={40} />
              <h2>USUARIOS</h2>
            </div>
            <button className="nueva-btn" onClick={() => navigate('/nuevoUsuario')}>
              Nueva
            </button>
          </div>

          <div className="areatableM">
            {cargando ? (
              <p>Cargando usuarios...</p>
            ) : (
              <>
                <div className="fila resumen">
                  <div className="res">
                    <p>Total Usuarios: {totalUsuarios}</p>
                  </div>
                  <div className="res">
                    <p>Usuarios Activos: {UsuariosActivos}</p>
                  </div>
                </div>

                <div className="fila buscador">
                  <SearchBar
                    width="100%"
                    backgroundColor="#8d9dad"
                    value={busqueda}
                    onChange={setBusqueda}
                  />
                </div>

                <div className="fila tabla-fila">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mostrarDatos.map((item, index) => (
                        <tr key={item.id}>
                          <td>{startItem + index}</td>
                          <td>{item.id}</td>
                          <td>{item.userName}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className={`status ${item.active ? 'active' : 'inactive'}`}>
                              {item.active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="acciones">
                            <button title="Ver"><FaEye /></button>
                            <button title="Editar"><FaEdit /></button>
                            <button title="Eliminar"><FaTrash /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="paginacion">
                  <span>
                    Mostrando {startItem}-{endItem} de {totalItems} elementos
                  </span>
                  <select value={filasPorPagina} onChange={(e) => setFilasPorPagina(parseInt(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}><FaArrowLeft /></button>
                  <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}><FaArrowRight /></button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsuarios;
