import React, { useState } from 'react';
import './DashboardUsuarios.css'
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft,FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

interface DatoUsuarios {
   id: number;
  username: string;
  email: string;
  active: boolean;
}

interface UsuariosProps {
  totalUsuarios: number;
  UsuariosActivos: number;
  datos: DatoUsuarios[];
}

const DashboardUsuarios: React.FC<UsuariosProps> = ({ totalUsuarios, UsuariosActivos, datos }) => {
    const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState<string>('');

  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const datosFiltrados = datos.filter((d) => {
      const query = busqueda.toLowerCase();
      return (
          d.username.toLowerCase().includes(query) ||
          d.id||
          d.email.toLowerCase().includes(query)
        );
    });
    const totalItems = datosFiltrados.length;  const startItem = (pagina - 1) * filasPorPagina + 1;
    const endItem = Math.min(pagina * filasPorPagina, totalItems);
    const totalPaginas = Math.ceil(totalItems / filasPorPagina);
    
    
  const mostrarDatos = datosFiltrados.slice(startItem - 1, endItem);

  React.useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  return (

    <div className="containerM">
    <TopBar/>
    <div className="contentM">
       < SideMenu/>
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
  backgroundColor='#8d9dad'
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
      <tr key={index}>
        <td>{startItem + index}</td>
        <td>{item.id}</td>
        <td>{item.username}</td>
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
          <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}><FaArrowLeft/></button>
                   <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}><FaArrowRight/></button>
        </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default DashboardUsuarios;
