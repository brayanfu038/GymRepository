import React, { useState } from 'react';
import './Membresias.css'
import SideMenu from '../SideMenu';
import TopBar from '../TopBar';
import SearchBar from '../SearchBar';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface DatoInventario {
  idProducto: string;
  nombre: string;
  tipoProducto: string;
  precio: string;
}

interface MembresiasProps {
  totalSuplementos: number;
  totalAccesorios: number;
  datos: DatoInventario[];
}

const DashboardInventario: React.FC<MembresiasProps> = ({ totalSuplementos, totalAccesorios, datos }) => {
  const [busqueda, setBusqueda] = useState<string>('');

  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const datosFiltrados = datos.filter((d) => {
      const query = busqueda.toLowerCase();
      return (
          d.nombre.toLowerCase().includes(query) ||
          d.idProducto.toLowerCase().includes(query) ||
          d.tipoProducto.toLowerCase().includes(query)||
          d.precio.toLowerCase().includes(query)
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
        <h2>Inventario</h2>
        <button className="nueva-btn">Nueva</button>
      </div>

      <div className="areatableM">

      <div className="fila resumen">
        <div className="res">
        <p>Total Suplementos: {totalSuplementos}</p>
        </div>
        <div className="res">
        <p>Toatal Accesorios: {totalAccesorios}</p>
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
              <th>ID. Producto</th>
              <th>Nombre</th>
              <th>Tipo de Producto</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {mostrarDatos.map((item, index) => (
              <tr key={index}>
                <td>{startItem + index}</td>
                <td>{item.idProducto}</td>
                <td>{item.nombre}</td>
                <td>{item.tipoProducto}</td>
                <td>{item.precio}</td>
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
          <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>←</button>
          <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>→</button>
        </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default DashboardInventario;
