import React, { useEffect, useState } from 'react';
import './DashboardInventario.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import inventoryService from '../../../service/inventory.service';

interface DatoInventario {
  id: number;
  name: string;
  productType: string | null;
  salePrice: number;
}

const DashboardInventario: React.FC = () => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState<string>('');
  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const [datos, setDatos] = useState<DatoInventario[]>([]);
  const [totalSuplementos, setTotalSuplementos] = useState<number>(0);
  const [totalAccesorios, setTotalAccesorios] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await inventoryService.getAll();
        setDatos(productos);

        const suplementos = productos.filter((p: DatoInventario) => p.productType === 'EDIBLE').length;
        const accesorios = productos.filter((p: DatoInventario) => p.productType === 'CLOTHING').length;

        setTotalSuplementos(suplementos);
        setTotalAccesorios(accesorios);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchData();
  }, []);

  const datosFiltrados = datos.filter((d) => {
    const query = busqueda.toLowerCase();
    return (
      d.name.toLowerCase().includes(query) ||
      d.id.toString().includes(query) ||
      (d.productType?.toLowerCase().includes(query) ?? false) ||
      d.salePrice.toString().includes(query)
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

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          <div className="filaI encabezadoI">
            <div className="titulo-usuarios">
              <MdOutlineInventory size={40} />
              <h1>Inventario</h1>
            </div>
            <button className="nueva-btn" onClick={() => navigate('/CrearProducto')}>
              Nueva
            </button>
          </div>

          <div className="areatableM">
            <div className="fila resumen">
              <div className="res">
                <p>Total Suplementos: {totalSuplementos}</p>
              </div>
              <div className="res">
                <p>Total Accesorios: {totalAccesorios}</p>
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
                    <th>ID. Producto</th>
                    <th>Nombre</th>
                    <th>Tipo de Producto</th>
                    <th>Precio</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {mostrarDatos.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startItem + index}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.productType ?? 'SIN TIPO'}</td>
                      <td>${item.salePrice.toFixed(2)}</td>
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
              <span>Mostrando {startItem}-{endItem} de {totalItems} elementos</span>
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

export default DashboardInventario;
