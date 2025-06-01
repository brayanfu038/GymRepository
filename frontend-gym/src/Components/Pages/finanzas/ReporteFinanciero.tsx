import React from 'react';
import TopBar from '../../generals/TopBar';
import SideMenu from '../../generals/SideMenu';
import './ReporteFinanciero.css';
import { useNavigate } from 'react-router-dom';

const ingresos = [
  {
    fecha: '17/08/2023',
    titular: 'James Gordon',
    monto: 50000,
    descripcion: 'Mensualidad mes de agosto',
    formaPago: 'Efectivo',
    hora: '10:30 am'
  },
  {
    fecha: '17/08/2023',
    titular: 'Camila Peña',
    monto: 25000,
    descripcion: 'Compra camiseta',
    formaPago: 'Efectivo',
    hora: '1:30 pm'
  }
];

const ReporteFinanciero: React.FC = () => {
  const navigate = useNavigate();

  const total = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);

  return (
    <div className="container-reporte">
      <TopBar />
      <div className="content-reporte">
        <SideMenu />
        <div className="mainArea-reporte">
          <button className="volver-btn" onClick={() => navigate(-1)}>← Volver</button>
          <h2 className="titulo-reporte">Reporte 17/ Agosto/2023</h2>

          <div className="card-reporte">
            <h3>Ingresos</h3>
            <table className="table-reporte">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th></th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {ingresos.map((ingreso, index) => (
                  <tr key={index}>
                    <td>{ingreso.fecha}</td>
                    <td>
                      <strong>Titular:</strong> {ingreso.titular}<br />
                      <strong>Monto:</strong> ${ingreso.monto.toLocaleString()}<br />
                      <strong>Descripción:</strong> {ingreso.descripcion}<br />
                      <strong>Forma de pago:</strong> {ingreso.formaPago}
                    </td>
                    <td>{ingreso.hora}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan={2}>TOTAL</td>
                  <td>${total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="exportar-btn">Exportar</button>
        </div>
      </div>
    </div>
  );
};

export default ReporteFinanciero;
