import React, { useEffect } from 'react'
import './HistorialPaqueteria.css'
import { handleGetData } from '../../../../Utils/handleGetData';
 export const HistorialPaqueteriaResidente = () => { 
    const [paquetes, setPaquetes]= React.useState([]);
    const [array, setArray]= React.useState();


  
    useEffect(() => {
        const fetchData = async ()=>{
          const paquetes = await handleGetData(`/Paquetes/Residente/${localStorage.getItem("ActualProfileId")}`)
          setPaquetes(paquetes);
        }
        fetchData()
    }, []); // Llamar a getUserData cuando el componente se monta
        //estado de paquete: 0 Sin recibir, 1 Recibido por el residente
        //La fecha y hora recibido están vacías si el paquete está sin recibir (0), fecha y hora de entrega corresponden a la fecha y hora en los que se entregó el paquete en portería
        //Debe haber un botón para modificar el estado del paquete (que manda por PUT el paquete actualizado con el estado y las fechas de recibido, además del id del residente que recibe)
        //Para saber el id del residente que recibe, buscarlo a través de su cédula en /Users/BuscarCedula
        //Id del residente que recibe queda igual que el idVigilante si ningún residente lo ha recibido
        //Si puede, hacer un filtro por fecha (dejarlo al final cuando el resto de funcionalidad esté lista, pero no pasa nada si no puede xd)

     return ( <div> 
      <h1 className='ZonasC'>Historial de Paqueteria</h1>
      <div className='contenedorLista'>
      {paquetes?.length === 0 ? (
            <p>No hay paquetes para mostrar</p>
        ) : (
            paquetes?.map((item,index) => (
                <div key={index} className='card'>
                  <div className='list-group list-group-flush'>
                    <p className='list-group-item'>Torre: {item?.torre}</p>
                    <p className='list-group-item'>Apto: {item?.apto}</p>
                    <p className='list-group-item'>Estado: {item?.estado}</p>
                    <p className='list-group-item'>Id del Residente que Recibe: {item?.idResidenteRecibe}</p>
                    <p className='list-group-item'>Fecha de Entrega: {item?.fechaEntrega}</p>
                    <p className='list-group-item'>Hora de Entrega: {item?.horaEntrega}</p>
                    <p className='list-group-item'>Fecha Recibido: {item?.fechaRecibido}</p> 
                    <p className='list-group-item'>Hora Recibido: {item?.horaRecibido}</p>
                  </div>

                </div>
            ))
        )}
      </div>

    </div>)


}