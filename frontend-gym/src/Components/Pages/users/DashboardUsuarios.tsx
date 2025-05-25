import React, { useState } from 'react';
import './Membresias.css'
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft,FaArrowRight } from 'react-icons/fa';

interface DatoUsuarios {
  documento: string;
  nombre: string;
  rol: string;
  contrasenia: string;
}

interface UsuariosProps {
  totalUsuarios: number;
  UsuariosActivos: number;
  datos: DatoUsuarios[];
}

const DashboardUsuarios: React.FC<UsuariosProps> = ({ totalUsuarios, UsuariosActivos, datos }) => {
  const [busqueda, setBusqueda] = useState<string>('');

  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const datosFiltrados = datos.filter((d) => {
      const query = busqueda.toLowerCase();
      return (
          d.nombre.toLowerCase().includes(query) ||
          d.documento.toLowerCase().includes(query) ||
          d.rol.toLowerCase().includes(query)
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
        <h2>USUARIOS</h2>
        <button className="nueva-btn">Nueva</button>
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
              <th>No. Documento</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Contraseña</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {mostrarDatos.map((item, index) => (
              <tr key={index}>
                <td>{startItem + index}</td>
                <td>{item.documento}</td>
                <td>{item.nombre}</td>
                <td>{item.rol}</td>
                <td>{item.contrasenia}</td>
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
