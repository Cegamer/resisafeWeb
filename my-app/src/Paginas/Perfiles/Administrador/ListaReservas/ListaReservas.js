import React, { useEffect, useState } from 'react';
import api from '../../../../Utils/Api';
import './ListaReservas.css';
import { cargarDatosPerfil } from '../../../../Utils/handleDatosPerfil';
import { handleGetData } from '../../../../Utils/handleGetData';

const ReservaItem = ({ reserva, onDelete }) => (
  <div className="reserva-item">
    <p>Zona Común: {reserva.nombreZonaComun}</p>
    <p>Reservante: {reserva.nombreReservante} {reserva.apellidoReservante}</p>
    <p>Cédula: {reserva.cedulaReservante}</p>
    <p>Fecha de Reserva: {reserva.fechaReserva}</p>
    <p>Hora de Inicio: {reserva.horaInicio}</p>
    <p>Hora de Fin: {reserva.horaFin}</p>
    <p>Cantidad de Personas: {reserva.cantidadPersonas}</p>
    <button onClick={() => onDelete(reserva.idReserva)}>Eliminar</button>
  </div>
);

export const ListaReservas = () => {
  const [datosPerfil, setDatosPerfil] = useState(null);
  const [reservas, setReservas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const values = await cargarDatosPerfil();
        setDatosPerfil(values);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        if (datosPerfil) {
          const values = await handleGetData(`/Reservas/Conjunto/${datosPerfil.idConjunto}`);
          setReservas(values);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservas();
  }, [datosPerfil]);

  const handleDeleteReserva = async (idReserva) => {
    try {
      const url = `${api}/Reservas/${idReserva}`;
      const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
      };

      const response = await fetch(url, options);
      if (response.ok) {
        // Si necesitas hacer algo después de eliminar la reserva, puedes hacerlo aquí
        console.log('Reserva eliminada exitosamente');
      } else {
        console.log('Error al eliminar reserva');
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      window.location.reload();
    }
  };

  return (
    <div>
      <h3 className='ZonasC'>Reservas de Zonas Comunes</h3>
      <div className='contenedorLista'>
        {reservas ? (
          reservas.map((reserva) => (
            <ReservaItem
              key={reserva.idReserva}
              reserva={reserva}
              onDelete={handleDeleteReserva}
            />
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default ListaReservas;
