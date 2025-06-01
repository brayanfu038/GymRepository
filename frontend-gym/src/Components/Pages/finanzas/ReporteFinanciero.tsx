import React from 'react';
import TopBar from '../../generals/TopBar';
import SideMenu from '../../generals/SideMenu';
import './ReporteFinanciero.css';
import { useNavigate } from 'react-router-dom';

const ReporteFinanciero: React.FC = () => {
  const navigate = useNavigate();

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
                <tr>
                  <td>17/08/2023</td>
                  <td>
                    <strong>Titular:</strong> James Gordon<br />
                    <strong>Monto:</strong> $50.000<br />
                    <strong>Descripción:</strong> Mensualidad mes de agosto<br />
                    <strong>Forma de pago:</strong> Efectivo
                  </td>
                  <td>10:30 am</td>
                </tr>
                <tr>
                  <td>17/08/2023</td>
                  <td>
                    <strong>Titular:</strong> Camila Peña<br />
                    <strong>Monto:</strong> $25.000<br />
                    <strong>Descripción:</strong> Compra camiseta<br />
                    <strong>Forma de pago:</strong> Efectivo
                  </td>
                  <td>1:30 pm</td>
                </tr>
                <tr className="total-row">
                  <td colSpan={2}>TOTAL</td>
                  <td>$75.000</td>
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
