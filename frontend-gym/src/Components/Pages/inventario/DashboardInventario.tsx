import React, { useEffect, useState } from 'react';
import './DashboardInventario.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import SearchBar from '../../generals/SearchBar';
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import inventoryService from '../../../service/inventory.service';
import DetallesProductoModal from './ProductosDetails';
import ModificarProductoPopup from './ModificarProducto';
import AlertaConfirmacion from '../../generals/AlertaConfirmacion';

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

  const [datos, setDatos] = useState<InventoryRequest[]>([]);
  //const [totalSuplementos, setTotalSuplementos] = useState<number>(0);
  //const [totalAccesorios, setTotalAccesorios] = useState<number>(0);
  const [cargando, setCargando] = useState(true);


  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);
  const [showPopupSee, setShowPopupSee] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupDel, setShowPopupDel] = useState(false);

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

  const handleSave = async (updatedProduct: any) => {
    console.log('Producto modificado:', updatedProduct);
    
    // Aquí llamas a la API o guardas localmente
    try {
      await inventoryService.updateProduct(updatedProduct.id, updatedProduct);
      setShowPopupEdit(false);
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

  const confirm = async () => {
    try {
      await inventoryService.deleteProduct(productoSeleccionado.id);
      setShowPopupDel(false);
      const productos = await inventoryService.getAll();
      setDatos(productos);

      const suplementos = productos.filter((p: DatoInventario) => p.productType === 'EDIBLE').length;
      const accesorios = productos.filter((p: DatoInventario) => p.productType === 'CLOTHING').length;

      setTotalSuplementos(suplementos);
      setTotalAccesorios(accesorios);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  const cancel = () => {
    setShowPopupDel(false);
  }

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
                      <td>{item.productType ?? 'SIN TIPO'}</td>
                      <td>${item.salePrice.toFixed(2)}</td>
                      <td className="acciones">
                        <button title="Ver" onClick={() => { setShowPopupSee(true), setProductoSeleccionado(item) }}><FaEye /></button>
                        <button title="Editar" onClick={() => { setProductoSeleccionado(item), setShowPopupEdit(true) }}><FaEdit /></button>
                        <button title="Eliminar" onClick={() => { setProductoSeleccionado(item), setShowPopupDel(true) }}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {productoSeleccionado && showPopupSee && (
              <DetallesProductoModal
                producto={productoSeleccionado}
                onClose={() => { setProductoSeleccionado(null), setShowPopupSee(false) }}
              />
            )}

            {productoSeleccionado && showPopupEdit && (
              <ModificarProductoPopup
                product={productoSeleccionado}
                onSave={handleSave}
                onClose={() => setProductoSeleccionado(null)}
              />
            )}

            <AlertaConfirmacion
              mensaje={'¿Seguro que quieres eliminar el registro?'}
              visible={showPopupDel} onConfirmar={confirm}
              onCancelar={cancel} />

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
