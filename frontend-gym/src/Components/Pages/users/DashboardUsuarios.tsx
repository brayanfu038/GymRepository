import React, { useState, useEffect } from 'react';
import './DashboardUsuarios.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEdit, FaSync, FaArrowLeft, FaArrowRight, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


interface DatoUsuarios {
  id: number;
  userName: string;
  names: string;
  lastNames: string;
  numberPhone: string;
  email: string;
  active: boolean;
  role: string;
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

        if (!response.ok) throw new Error(`Error al obtener usuarios: ${response.status}`);
        const data = await response.json();
        setDatos(data);
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
      `${d.names} ${d.lastNames}`.toLowerCase().includes(query) ||
      d.role.toLowerCase().includes(query) ||
      (d.active ? 'activo' : 'inactivo').includes(query)
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
  const usuariosActivos = datos.filter(d => d.active).length;

  const editarUsuario = (usuario: DatoUsuarios) => {
    navigate(`/editarUsuario/${usuario.id}`, { state: { usuario } });
  };

  const cambiarEstado = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `${token}` },
      });
      if (!response.ok) throw new Error('Error al cambiar estado');
      setDatos((prev) =>
        prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

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
              <FaUserPlus /> Crear Usuario
            </button>
          </div>

          <div className="areatableM">
            {cargando ? (
              <p>Cargando usuarios...</p>
            ) : (
              <>
                <div className="fila resumen">
                  <div className="res"><p>Total Usuarios: {totalUsuarios}</p></div>
                  <div className="res"><p>Usuarios Activos: {usuariosActivos}</p></div>
                </div>

                <div className={`fila buscador ${busqueda ? 'buscando' : ''}`}>
                  <SearchBar
                    width="100%"
                    backgroundColor="#8d9dad"
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar por nombre, rol o estado"
                  />
                </div>

                <div className="fila tabla-fila">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre Completo</th>
                        <th>Teléfono</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mostrarDatos.map((item, index) => (
                        <tr key={item.id}>
                          <td>{startItem + index}</td>
                          <td>{item.names} {item.lastNames}</td>
                          <td>{item.numberPhone}</td>
                          <td>{item.userName}</td>
                          <td>{item.role}</td>
                          <td>
                            <span className={`status ${item.active ? 'active' : 'inactive'}`}>
                              {item.active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="acciones">
                            <button title="Editar" onClick={() => editarUsuario(item)}>
                              <FaEdit />
                            </button>
                            <button title="Cambiar estado" onClick={() => cambiarEstado(item.id)}>
                              <FaSync />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="paginacion">
                  <span>Mostrando {startItem}-{endItem} de {totalItems} elementos</span>
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
