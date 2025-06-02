import React, { useState } from 'react';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import './DashboardRutinas.css';
import { useNavigate } from 'react-router-dom';

const DashboardRutinas: React.FC = () => {
  const navigate = useNavigate();

  const [nombreRutina, setNombreRutina] = useState('');
  const [parteCuerpo, setParteCuerpo] = useState('');
  const [notas, setNotas] = useState('');
  const [duracion, setDuracion] = useState('');
  const [nuevoEjercicio, setNuevoEjercicio] = useState({
    id: '',
    nombre: '',
  });

  const [ejercicios, setEjercicios] = useState<any[]>([]); // Lista de ejercicios agregados

  const agregarEjercicio = () => {
    if (nuevoEjercicio.nombre !== '') {
      const idGenerado = `E${(100 + ejercicios.length + 1).toString().padStart(2, '0')}`;
      setEjercicios([
        ...ejercicios,
        {
          id: idGenerado,
          nombre: nuevoEjercicio.nombre,
          descripcion: 'Descripción por defecto',
          sets: 4,
          repeticiones: 12,
        },
      ]);
      setNuevoEjercicio({ id: '', nombre: '' });
    }
  };

  const guardarRutina = () => {
    console.log({
      nombreRutina,
      parteCuerpo,
      notas,
      duracion,
      ejercicios,
    });
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          <div className="encabezado-rutina">
            <button className="volver-btn" onClick={() => navigate(-1)}>← Volver</button>
            <h1>Rutina</h1>
          </div>

          <div className="formulario-rutina">
            <div className="guardar-boton-wrapper">
              <button className="guardar-btn" onClick={() => navigate('/rutinas/resumen')}>
                Guardar información
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="nombreRutina" className="block text-sm font-medium text-gray-700">
                Nombre Rutina
              </label>
              <input
                type="text"
                id="nombreRutina"
                name="nombreRutina"
                placeholder="Tren inferior"
                value={nombreRutina}
                onChange={(e) => setNombreRutina(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="fila-flex">
              <div className="fila-form">
                <label htmlFor="parteCuerpo">Parte del cuerpo a trabajar</label>
                <select
                  id="parteCuerpo"
                  value={parteCuerpo}
                  onChange={(e) => setParteCuerpo(e.target.value)}
                  className="select-parte"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Piernas">Piernas</option>
                  <option value="Espalda">Espalda</option>
                  <option value="Pecho">Pecho</option>
                  <option value="Brazos">Brazos</option>
                  <option value="Abdomen">Abdomen</option>
                </select>
              </div>

              <div className="fila-form">
                <label htmlFor="notas">Notas</label>
                <textarea
                  id="notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Ej: Realizar estiramiento previo..."
                  className="textarea-notas"
                ></textarea>
              </div>
            </div>

            <div className="fila-flex">
              <div className="fila-form">
                <label htmlFor="ejercicio">Ejercicio</label>
                <div className="contenedor-ejercicio">
                  <select
                    id="ejercicio"
                    value={nuevoEjercicio.nombre}
                    onChange={(e) =>
                      setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })
                    }
                    className="select-ejercicio"
                  >
                    <option value="">Selecciona un ejercicio</option>
                    <option value="Bulgaras">Búlgaras</option>
                    <option value="Hip-Trust">Hip-Trust</option>
                    <option value="Peso Muerto">Peso Muerto</option>
                    <option value="Zancadas">Zancadas</option>
                  </select>

                  <button
                    className="boton-mas"
                    onClick={() => navigate('/rutinas/nuevo-ejercicio')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="fila-form duracion-form">
                <label htmlFor="duracion">Duración</label>
                <input
                  type="text"
                  id="duracion"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                  placeholder="Ej: 45 minutos"
                  className="input-duracion"
                />
              </div>
            </div>

            {/* ✅ Tabla integrada al cuadro blanco */}
            <div className="tabla-ejercicios">
              <h3>Ejercicios agregados</h3>
              <table className="tabla-profesional">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID Ejercicio</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Sets</th>
                    <th>Repeticiones</th>
                  </tr>
                </thead>
                <tbody>
                  {ejercicios.length > 0 ? (
                    ejercicios.map((ejer, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ejer.id}</td>
                        <td>{ejer.nombre}</td>
                        <td>{ejer.descripcion}</td>
                        <td>{ejer.sets}</td>
                        <td>{ejer.repeticiones}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '1rem', color: '#9ca3af' }}>
                        No hay ejercicios agregados aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="paginacion-simulada">
                <span>Rows per page: 10 ▼</span>
                <span>1–0 of 0</span>
                <span style={{ color: '#9ca3af' }}>◀</span>
                <span style={{ color: '#9ca3af' }}>▶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRutinas;
