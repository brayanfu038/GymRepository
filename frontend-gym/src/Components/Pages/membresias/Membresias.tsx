import React, { useState } from 'react';
import './Membresias.css'
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { FiUser } from 'react-icons/fi';



interface DatoMembresia {
  documento: string;
  nombre: string;
  tipo: string;
  vencimiento: string;
}

interface MembresiasProps {
  totalMiembros: number;
  membresiasActivas: number;
  datos: DatoMembresia[];
}

const Membresias: React.FC<MembresiasProps> = ({ totalMiembros, membresiasActivas, datos }) => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState<string>('');

  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const datosFiltrados = datos.filter((d) => {
    const query = busqueda.toLowerCase();
    return (
      d.nombre.toLowerCase().includes(query) ||
      d.documento.toLowerCase().includes(query) ||
      d.tipo.toLowerCase().includes(query)
    );
  });
  const totalItems = datosFiltrados.length; const startItem = (pagina - 1) * filasPorPagina + 1;
  const endItem = Math.min(pagina * filasPorPagina, totalItems);
  const totalPaginas = Math.ceil(totalItems / filasPorPagina);


  const mostrarDatos = datosFiltrados.slice(startItem - 1, endItem);

  React.useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  return (

    <div className="containerM">
      <TopBar />
      <div className="contentM">
        < SideMenu />
        <div className="mainAreaM">

          <div className="filaMM encabezadoMM">
            <div className="titulo-usuariosMM">
              <FiUser size={40} />
              <h2>Membresias</h2>
            </div>
            <button className="nueva-btn" onClick={() => navigate('/nuevoUsuario')}>
              Nueva
            </button>
          </div>

          <div className="areatableM">

            <div className="fila resumen">
              <div className="res">
                <p>Total Miembros: {totalMiembros}</p>
              </div>
              <div className="res">
                <p>Membresías Activas: {membresiasActivas}</p>
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
                    <th>Tipo de Membresía</th>
                    <th>Fecha de vencimiento</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {mostrarDatos.map((item, index) => (
                    <tr key={index}>
                      <td>{startItem + index}</td>
                      <td>{item.documento}</td>
                      <td>{item.nombre}</td>
                      <td>{item.tipo}</td>
                      <td>{item.vencimiento}</td>
                      <td><button><FaEye /></button></td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membresias;
