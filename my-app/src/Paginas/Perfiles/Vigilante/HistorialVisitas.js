import React, { useEffect } from "react";
import api from "../../../Utils/Api";
import "./HistorialVisitas.css";
import { handleGetData } from "../../../Utils/handleGetData";
export const HistorialVisitas = () => {
  const [visitas, setVisitas] = React.useState([]);
  const [array, setArray] = React.useState();

  useEffect(() => {
    const fetchData = async () => {
      const visitas = await handleGetData(
        `/RegistroVisitantes/Conjunto/${localStorage.getItem(
          "ActualConjuntoId"
        )}`
      );
      setVisitas(visitas);
    };
    fetchData();
  }, []); // Llamar a getUserData cuando el componente se monta
  //estado de paquete: 0 Sin recibir, 1 Recibido por el residente
  //La fecha y hora recibido están vacías si el paquete está sin recibir (0), fecha y hora de entrega corresponden a la fecha y hora en los que se entregó el paquete en portería
  //Debe haber un botón para modificar el estado del paquete (que manda por PUT el paquete actualizado con el estado y las fechas de recibido, además del id del residente que recibe)
  //Para saber el id del residente que recibe, buscarlo a través de su cédula en /Users/BuscarCedula
  //Id del residente que recibe queda igual que el idVigilante si ningún residente lo ha recibido
  //Si puede, hacer un filtro por fecha (dejarlo al final cuando el resto de funcionalidad esté lista, pero no pasa nada si no puede xd)

  return (
    <div>
      <h1 className="ZonasC">Historial de Visitas</h1>
      <div className="contenedorLista">
        {visitas.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          visitas.map((item, index) => (
            <div key={index} className="card">
              <div className="list-group list-group-flush">
                <p className="list-group-item">Cédula: {item.cedula}</p>
                <p className="list-group-item">Nombre: {item.nombre}</p>
                <p className="list-group-item">apellido: {item.apellido}</p>
                <p className="list-group-item">
                  Fecha de Ingreso: {item.fecha}
                </p>
                <p className="list-group-item">
                  Hora de Ingreso: {item.horaIngreso}
                </p>
                <p className="list-group-item">
                  Hora de Salida: {item.horaSalida}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
