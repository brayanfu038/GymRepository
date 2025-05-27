import React, { useState } from 'react';
import './DashboardFinanzas.css'
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

interface DatoFinanza {
  idTransaccion: string;
  titular: string;
  tipoTransaccion: string;
  valor: string;
}

interface FinanzasProps {
  entradasDia: number;
  salidasDia: number;
  datos: DatoFinanza[];
}

const DashboardFinanzas: React.FC<FinanzasProps> = ({ entradasDia, salidasDia, datos }) => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState<string>('');

  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const datosFiltrados = datos.filter((d) => {
    const query = busqueda.toLowerCase();
    return (
      d.idTransaccion.toLowerCase().includes(query) ||
      d.titular.toLowerCase().includes(query) ||
      d.tipoTransaccion.toLowerCase().includes(query) ||
      d.valor.toLowerCase().includes(query)
    );
  });

  const totalItems = datosFiltrados.length;
  const startItem = (pagina - 1) * filasPorPagina + 1;
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
        <SideMenu />
        <div className="mainAreaM">

          <div className="filaI encabezadoI">
            <div className="titulo-usuarios">
              <MdAttachMoney size={40} />
              <h2>FINANZAS</h2>
            </div>
            <div>
              <button className="nueva-btn" onClick={() => navigate('/CrearTransaccion')}>
                Nueva
              </button>
              <button className="reporte-btn" onClick={() => navigate('/ReporteFinanzas')} style={{marginLeft: '10px'}}>
                Reporte
              </button>
            </div>
          </div>

          <div className="areatableM">

            <div className="fila resumen">
              <div className="res">
                <p>Entradas en el día: {entradasDia}</p>
              </div>
              <div className="res">
                <p>Salidas en el día: {salidasDia}</p>
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
                    <th>Id Transacción</th>
                    <th>Titular</th>
                    <th>Tipo de Transacción</th>
                    <th>Valor</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {mostrarDatos.map((item, index) => (
                    <tr key={index}>
                      <td>{startItem + index}</td>
                      <td>{item.idTransaccion}</td>
                      <td>{item.titular}</td>
                      <td>{item.tipoTransaccion}</td>
                      <td>{item.valor}</td>
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

          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardFinanzas;
