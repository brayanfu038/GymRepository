import React, { useEffect, useState } from 'react';
import './DashboardInventario.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import inventoryService, { InventoryRequest } from '../../../service/inventory.service';

const DashboardInventario: React.FC = () => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState<string>('');
  const [pagina, setPagina] = useState<number>(1);
  const [filasPorPagina, setFilasPorPagina] = useState<number>(10);

  const [datos, setDatos] = useState<InventoryRequest[]>([]);
  //const [totalSuplementos, setTotalSuplementos] = useState<number>(0);
  //const [totalAccesorios, setTotalAccesorios] = useState<number>(0);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const obtenerInventario = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/inventario/allInventory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) throw new Error(`Error al obtener Inventario: ${response.status}`);
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error al cargar el Inventario:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerInventario();
  }, []);

  const datosFiltrados = datos.filter((d) => {
    const query = busqueda.toLowerCase();
    return (
      d.name.toLowerCase().includes(query) ||
      d.id?.toString().includes(query) ||
      d.productType.toLowerCase().includes(query) ||
      d.sale_price.toString().includes(query)
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

  const handleVer = (id: number) => {
    navigate(`/verProducto/${id}`);
  };

  const handleEditar = (id: number) => {
    navigate(`/editarProducto/${id}`);
  };

  const handleEliminar = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await inventoryService.delete(id);
        setDatos(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

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
            {cargando ? (
              <p>Cargando usuarios...</p>
            ) : (
              <>
                <div className="fila resumen">
                  <div className="res">
                    <p>Total Suplementos: {1}</p>
                  </div>
                  <div className="res">
                    <p>Total Accesorios: {2}</p>
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
                          <td>{item.productType}</td>
                          <td>${item.sale_price.toFixed(2)}</td>
                          <td className="acciones">
                            <button title="Ver" onClick={() => handleVer(item.id!)}><FaEye /></button>
                            <button title="Editar" onClick={() => handleEditar(item.id!)}><FaEdit /></button>
                            <button title="Eliminar" onClick={() => handleEliminar(item.id!)}><FaTrash /></button>
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

export default DashboardInventario;
